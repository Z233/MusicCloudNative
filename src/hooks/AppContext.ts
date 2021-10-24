import React, { useContext } from "react";
import { ApiClient, UserInfo } from "../api";
import { Player } from "../player";
import { AppI18n } from "../i18n/AppI18n";
import { Storage } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = React.createContext<AppService>(null!);

export function useApp() { return useContext(AppContext); }

interface Config {
    userinfo?: UserInfo;
}

export class AppService {
    apiClient = new ApiClient("mc-");
    player = new Player(this);
    i18n = new AppI18n();
    config: Config = {};
    configStorage = new Storage('mc-config');

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
    }

    async save() {
        await this.configStorage.setJson('', this.config);
    }

    destroy() {
        console.info("AppService destroy");
        this.player.destroy();
    }
}
