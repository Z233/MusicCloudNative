import React, { useContext } from "react";
import { ApiClient } from "../api";
import { Player } from "../player";
import { AppI18n } from "../i18n/AppI18n";

export const AppContext = React.createContext<AppService>(null!);

export function useApp() { return useContext(AppContext); }

export class AppService {
    apiClient = new ApiClient("mc-");
    player = new Player(this);
    i18n = new AppI18n();

    constructor() {
        this.i18n.init();
    }

    destroy() {
        console.info("AppService destroy");
        this.player.destroy();
    }
}
