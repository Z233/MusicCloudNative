import { Ref, sleepAsync } from "../utils/webfx";
import { Api } from "./apidef";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiBaseClient } from "./api";
//@ts-expect-error
import base64 from "react-native-base64";
import { pick } from "lodash";

export type LoadingState = 'empty' | 'loading' | 'done' | 'error';

export interface UserInfo {
    id: number | null;
    username: string | null;
    avatar: string | null;
    token: string | null;
    lists: Api.TrackListInfo[] | null;
}

export abstract class ApiResource<T> {
    stateRef = new Ref<LoadingState>('empty');
    valueRef: Ref<T>;
    get value() { return this.valueRef.value; }
    set value(val) { this.valueRef.value = val; }
    get state() { return this.stateRef.value; }
    set state(val) { this.stateRef.value = val; }

    constructor(readonly client: ApiClient, value: T) {
        this.valueRef = new Ref<T>(value)
    }

    use(loadIfEmpty = false) {
        if (loadIfEmpty) this.loadIfEmpty();
        return {
            state: this.stateRef.useValue(),
            value: this.valueRef.useValue()
        }
    };

    loadIfEmpty() {
        if (this.state == 'empty') {
            return this.load();
        }
    }

    async load() {
        let fetched = false;
        const key = this._cacheKey();
        if (key && this.state == 'empty') {
            sleepAsync(1000).then(async () => {
                if (fetched) return;
                // If the fetching is too slow, then load from the cache.
                const cached = await this.client._storage.getJson(key) as T;
                if (fetched) return;
                if (cached) {
                    this.valueRef.value = cached;
                }
            });
        }
        this.state = 'loading';
        let value;
        try {
            value = this.valueRef.value = await this._loadImpl();
        } catch (error) {
            console.error('resource loading error', error);
            this.state = 'error';
            return;
        }
        fetched = true;
        if (key) this.client._storage.setJson(key, value);
        this.state = 'done';
    }

    async waitUntilLoaded() {
        while (this.state !== 'done') {
            if (this.state !== 'loading') {
                await this.load();
            } else {
                await this.stateRef.waitForChange();
            }
        }
    }

    async saveCache() {
        const key = this._cacheKey();
        if (key) this.client._storage.setJson(key, this.value);
    }

    protected _cacheKey(): string | null { return null; };
    protected _loadImpl(): Promise<T> { throw new Error("No impl") };
}

export type Playlist = Api.TrackListGet;

export class PlaylistResource extends ApiResource<Api.TrackListGet> {
    protected _cacheKey(): string {
        return "list-" + this.value.id;
    }
    protected async _loadImpl() {
        const id = this.value.id;
        const resp = await this.client._api.get("lists/" + id) as Playlist;
        resp.picurl = this.client._api.processUrl(resp.picurl);
        this.client.processTracks(resp.tracks, id);
        return resp;
    }
    async put() {
        const list = this.value;
        await this.client._api.put({
            path: 'lists/' + list.id,
            obj: {
                ...(pick(list, ['id', 'name', 'owner', 'version', 'visibility'] as Array<keyof Playlist>)),
                trackids: list.tracks.map(t => t.id)
            } as Api.TrackListPut
        });
        this.valueRef.value = { ...list, version: list.version + 1 }
    }
    addTrack(...tracks: Api.Track[]) {
        this.value.tracks.unshift(...tracks?.map(track => ({ ...track, _list: this.value.id })));
        this.postChange();
    }
    removeTrack(...tracks: Api.Track[]) {
        tracks.forEach(t => this.value.tracks.remove(t));
        this.postChange();
    }
    postChange() {
        this.valueRef.onChanged.invoke(this.valueRef);
        this.value.tracks.forEach((t, i) => {
            t._pos = i;
        });
    }
}

export class UploadsResources extends ApiResource<Api.Track[]> {
    protected _cacheKey(): string {
        return "uploads-u-" + this.client.userInfo.value.username;
    }
    protected async _loadImpl() {
        const resp = await this.client._api.get("users/me/uploads") as {
            tracks: Api.Track[]
        };
        this.client.processTracks(resp.tracks);
        return resp.tracks;
    }
}

export class RecentPlaysResources extends ApiResource<Api.Track[]> {
    protected _cacheKey(): string {
        return "recentplays-u-" + this.client.userInfo.value.username;
    }
    protected async _loadImpl() {
        const resp = await this.client._api.get("users/me/recentplays") as {
            tracks: Api.Track[]
        };
        this.client.processTracks(resp.tracks);
        return resp.tracks;
    }
}

export class LoudmapResources extends ApiResource<{ id: number; loudmap: Uint8Array | null }> {
    protected _cacheKey(): string {
        return "loudmap-" + this.value.id;
    }
    protected async _loadImpl() {
        const id = this.value.id;
        const resp = await this.client._api.getRaw("tracks/" + id + "/loudnessmap") as any;
        return { id, loudmap: new Uint8Array(resp) };
    }
}

export class UserInfoResource extends ApiResource<UserInfo> {
}

export class ApiClient {
    readonly userInfo = new UserInfoResource(this, {
        id: null,
        username: null,
        avatar: null,
        token: null,
        lists: null,
    });

    private listsMap = new Map<number, PlaylistResource>();
    uploads = new UploadsResources(this, []);
    recentplays = new RecentPlaysResources(this, []);
    private loudMap = new Map<number, LoudmapResources>();

    readonly _storage: Storage;
    readonly _api = new ApiBaseClient();

    constructor(storagePrefix: string) {
        this._storage = new Storage(storagePrefix);
    }

    async readSavedInfo() {
        const storedInfo = await this._storage.getJson("userinfo") as UserInfo;
        if (storedInfo && storedInfo.username && storedInfo.token) {
            this.userInfo.valueRef.value = { ...this.userInfo.valueRef.value, ...storedInfo };
            this.userInfo.stateRef.value = 'loading';
            this.setToken(storedInfo.token);
            this.getUserInfo();
        }
    }

    async login(username: string, passwd: string) {
        const resp = await this._api.post({
            path: "users/me/login",
            auth: 'Basic ' + base64.encode(username + ':' + passwd)
        }) as Api.UserInfo;
        await this.handleUserInfo(resp);
    }

    async register(username: string, passwd: string) {
        const resp = await this._api.post({
            path: "users/new",
            obj: {
                username,
                passwd
            } as Api.UserInfo
        }) as Api.UserInfo;
        await this.handleUserInfo(resp);
    }

    async setAvatar(buffer: Uint8Array) {
        await this._api.put({
            path: 'users/me/avatar',
            mode: 'raw',
            obj: buffer
        });
        await this.getUserInfo();
    }

    async addPlayingRecord(track: Api.Track) {
        this.recentplays.valueRef.value = [track, ...this.recentplays.valueRef.value.filter(t => t.id != track.id)];
        this.recentplays.saveCache();
        await this._api.post({
            path: 'users/me/playing',
            obj: {
                listid: 0,
                trackid: track.id,
                position: 0,
            } as Api.TrackLocation
        });
    }

    getPlaylistResource(id: number) {
        let res = this.listsMap.get(id);
        if (!res) {
            res = new PlaylistResource(this, null!);
            const inIndex = this.userInfo.valueRef.value?.lists?.find(x => x.id == id);
            if (inIndex) res.valueRef.value = { ...inIndex, tracks: null! };
            else res.valueRef = { id } as any;
            res.stateRef.value = 'loading';
            this.listsMap.set(id, res);
            if (id > 0) this.updatePlaylistResource(id);
        }
        return res;
    }

    getLoudmapResource(id: number) {
        let res = this.loudMap.get(id);
        if (!res) {
            res = new LoudmapResources(this, { id, loudmap: null });
            if (id > 0) res.loadIfEmpty();
            this.loudMap.set(id, res);
        }
        return res;
    }

    async updatePlaylistResource(id: number) {
        await this.listsMap.get(id)!.load();
    }

    private async getUserInfo() {
        const resp = await this._api.get("users/me") as Api.UserInfo;
        await this.handleUserInfo(resp);
    }

    private setToken(token: string) {
        this._api.defaultAuth = "Bearer " + token;
    }

    private async handleUserInfo(resp: Api.UserInfo) {
        const userInfo = {
            id: resp.id!,
            username: resp.username,
            avatar: this._api.processUrl(resp.avatar) || null,
            token: resp.token ? resp.token : this.userInfo.valueRef.value!.token,
            lists: resp.lists!,
        };
        this.userInfo.stateRef.value = 'done';
        this.setToken(userInfo.token!);
        for (const l of userInfo.lists) {
            l.picurl = this._api.processUrl(l.picurl);
        }
        await this._storage.setJson("userinfo", userInfo);
        this.userInfo.valueRef.value = userInfo;
    }

    processTracks(tracks: Api.Track[], list?: number) {
        let i = 0;
        for (const t of tracks) {
            t.url = this._api.processUrl(t.url);
            t.picurl = this._api.processUrl(t.picurl);
            t.thumburl = this._api.processUrl(t.thumburl);
            t._list = list;
            t._pos = i++;
        }
        return tracks;
    }
}

class Storage {
    constructor(readonly prefix: string) {
    }

    async getJson(key: string) {
        const str = await AsyncStorage.getItem(this.prefix + key);
        return str ? JSON.parse(str) : null;
    }

    async setJson(key: string, val: any) {
        await AsyncStorage.setItem(this.prefix + key, JSON.stringify(val));
    }
}
