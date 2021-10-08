import { Ref } from "../utils/webfx";
import { Api } from "./apidef";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiBaseClient } from "./api";
//@ts-expect-error
import base64 from "react-native-base64";

export type LoadingState = 'empty' | 'loading' | 'done';

export interface UserInfo {
    username: string | null;
    token: string | null;
    lists: Api.TrackListInfo[] | null;
    state: LoadingState;
}

export interface Playlist extends Api.TrackListGet {
    state: LoadingState;
}

export class ApiClient {
    readonly userInfo = new Ref<UserInfo>();
    private readonly storage: Storage;
    private readonly api = new ApiBaseClient();
    private listsMap = new Map<number, Ref<Playlist>>();

    constructor(storagePrefix: string) {
        this.storage = new Storage(storagePrefix);
        this.userInfo.value = {
            username: null,
            token: null,
            lists: null,
            state: 'empty',
        };
    }

    async readSavedInfo() {
        const storedInfo = await this.storage.getJson("userinfo") as UserInfo;
        if (storedInfo && storedInfo.username && storedInfo.token) {
            this.userInfo.value = { ...this.userInfo.value, ...storedInfo, state: 'loading' };
            this.setToken(storedInfo.token);
            this.getUserInfo();
        }
    }

    async login(username: string, passwd: string) {
        const resp = await this.api.post({
            path: "users/me/login",
            auth: 'Basic ' + base64.encode(username + ':' + passwd)
        }) as Api.UserInfo;
        await this.handleUserInfo(resp);
    }

    async register(username: string, passwd: string) {
        const resp = await this.api.post({
            path: "users/new",
            obj: {
                username,
                passwd
            } as Api.UserInfo
        }) as Api.UserInfo;
        await this.handleUserInfo(resp);
    }

    getPlaylistRef(id: number) {
        let ref = this.listsMap.get(id);
        if (!ref) {
            ref = new Ref<Playlist>();
            const inIndex = this.userInfo.value?.lists?.find(x => x.id == id);
            if (inIndex) ref.value = { ...inIndex, tracks: null!, state: 'loading' };
            else ref.value = { id, state: 'loading' } as any;
            this.listsMap.set(id, ref);
            this.updatePlaylist(id);
        }
        return ref;
    }

    async updatePlaylist(id: number) {
        const resp = await this.api.get("lists/" + id) as Playlist;
        resp.state = 'done';
        resp.picurl = this.api.processUrl(resp.picurl);
        for (const t of resp.tracks) {
            t.picurl = this.api.processUrl(t.picurl);
            t.thumburl = this.api.processUrl(t.thumburl);
        }
        this.listsMap.get(id)!.value = resp;
    }

    private async getUserInfo() {
        const resp = await this.api.get("users/me") as Api.UserInfo;
        await this.handleUserInfo(resp);
    }

    private setToken(token: string) {
        this.api.defaultAuth = "Bearer " + token;
    }

    private async handleUserInfo(resp: Api.UserInfo) {
        const userInfo = {
            username: resp.username,
            token: resp.token ? resp.token : this.userInfo.value!.token,
            lists: resp.lists!,
            state: 'done' as const,
        };
        this.setToken(userInfo.token!);
        for (const l of userInfo.lists) {
            l.picurl = this.api.processUrl(l.picurl);
        }
        await this.storage.setJson("userinfo", userInfo);
        this.userInfo.value = userInfo;
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
