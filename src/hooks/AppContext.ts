import React, { useContext } from "react";
import { ApiClient } from "../api";
import { Player } from "../player";

export const AppContext = React.createContext<AppService>(null!);

export function useApp() { return useContext(AppContext); }

export class AppService {
    apiClient = new ApiClient("mc-");
    player = new Player();

    destroy() {
        console.info("AppService destroy");
        this.player.destroy();
    }
}
