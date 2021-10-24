import React, { useContext } from "react";
import { ApiClient, UserInfo } from "../api";
import { Player } from "../player";
import { AppI18n } from "../i18n/AppI18n";
import { Storage } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ref } from "../utils/webfx";

export const AppContext = React.createContext<AppService>(null!);

export function useApp() { return useContext(AppContext); }

interface Config {
    userinfo?: UserInfo;
    theme?: string;
}

export class AppService {
    apiClient = new ApiClient("mc-");
    player = new Player(this);
    i18n = new AppI18n();

    config: Config = {};
    configStorage = new Storage('mc-config');

    themeRef = new Ref<string>('#ff6557');

    constructor() {
        this.i18n.init();
        this.apiClient.onSaveUserinfo = (info) => {
            this.config.userinfo = info;
            this.save();
        }
    }

    async init() {
        this.config = await this.configStorage.getJson('') ?? {};
        this.apiClient.handleSavedInfo(this.config.userinfo);
        if (this.config.theme)
            this.themeRef.value = this.config.theme;
    }

    async save() {
        this.config.theme = this.themeRef.value;
        await this.configStorage.setJson('', this.config);
    }

    destroy() {
        console.info("AppService destroy");
        this.player.destroy();
    }
}
