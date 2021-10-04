import { Ref } from "./webfxUtil";
import { Api } from "./apidef";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiBaseClient } from "./api";
import base64 from "react-native-base64";

export interface UserInfo {
    username: string | null;
    token: string | null;
    lists: Api.TrackListInfo[] | null;
    updating: boolean;
}

export class ApiClient {
    readonly userInfo = new Ref<UserInfo>();
    private readonly storage: Storage;
    private readonly api = new ApiBaseClient();

    constructor(storagePrefix: string) {
        this.storage = new Storage(storagePrefix);
        this.userInfo.value = {
            username: null,
            token: null,
            lists: null,
            updating: false,
        };
    }

    async readSavedInfo() {
        const storedInfo = await this.storage.getJson("userinfo") as UserInfo;
        if (storedInfo && storedInfo.username && storedInfo.token) {
            this.userInfo.value = { ...this.userInfo.value, ...storedInfo, updating: true };
            this.setToken(storedInfo.token)
            this.getUserInfo();
        }
    }

    async login(username: string, passwd: string) {
        const resp = await this.api.post({
            path: "users/me/login",
            auth: 'Basic ' + base64.encode(username + ':' + passwd)
        }) as Api.UserInfo;
        this.setToken(resp.token!);
        await this.handleUserInfo(resp);
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
            updating: false,
        };
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
