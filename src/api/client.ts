import { Ref, sleepAsync } from "../utils/webfx";
import { Api } from "./apidef";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiBaseClient } from "./api";
//@ts-expect-error
import base64 from "react-native-base64";

export type LoadingState = 'empty' | 'loading' | 'done';

export interface UserInfo {
    username: string | null;
    avatar: string | null;
    token: string | null;
    lists: Api.TrackListInfo[] | null;
}

export abstract class ApiResource<T> {
    stateRef = new Ref<LoadingState>('empty');
    valueRef: Ref<T>;

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
        if (this.stateRef.value == 'empty') {
            return this.load();
        }
    }

    async load() {
        let fetched = false;
        const key = this._cacheKey();
        if (key && this.stateRef.value == 'empty') {
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
        this.stateRef.value = 'loading';
        const value = this.valueRef.value = await this._loadImpl();
        fetched = true;
        if (key) this.client._storage.setJson(key, value);
        this.stateRef.value = 'done';
    }

    async saveCache() {
        const key = this._cacheKey();
        if (key) this.client._storage.setJson(key, this.valueRef.value);
    }

    protected _cacheKey(): string | null { return null; };
    protected _loadImpl(): Promise<T> { throw new Error("No impl") };
}

export type Playlist = Api.TrackListGet;

export class PlaylistResource extends ApiResource<Api.TrackListGet> {
    protected _cacheKey(): string {
        return "list-" + this.valueRef.value.id;
    }
    protected async _loadImpl() {
        const id = this.valueRef.value.id;
        const resp = await this.client._api.get("lists/" + id) as Playlist;
        resp.picurl = this.client._api.processUrl(resp.picurl);
        this.client.processTracks(resp.tracks, id);
        return resp;
    }
}

export class UploadsResources extends ApiResource<Api.Track[]> {
    protected _cacheKey(): string {
        return "uploads-u-" + this.client.userInfo.valueRef.value.username;
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
        return "recentplays-u-" + this.client.userInfo.valueRef.value.username;
    }
    protected async _loadImpl() {
        const resp = await this.client._api.get("users/me/recentplays") as {
            tracks: Api.Track[]
        };
        this.client.processTracks(resp.tracks);
        return resp.tracks;
    }
}

export class UserInfoResource extends ApiResource<UserInfo> {
}

export class ApiClient {
    readonly userInfo = new UserInfoResource(this, {
        username: null,
        avatar: null,
        token: null,
        lists: null,
    });

    private listsMap = new Map<number, PlaylistResource>();
    uploads = new UploadsResources(this, []);
    recentplays = new RecentPlaysResources(this, []);

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
            this.updatePlaylistResource(id);
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
