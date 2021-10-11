import React, { useContext } from "react";
import { ApiClient, UserInfo, Playlist } from "./client";
import { useWebfxRef } from "../utils/webfxForReact";

export const ApiContext = React.createContext<ApiClient>(null!);

export function useClient() {
    return useContext(ApiContext);
}

export function useUserInfo(): UserInfo {
    return useWebfxRef(useClient().userInfo)!;
}

export function usePlayList(id: number): Playlist {
    const client = useClient();
    return useWebfxRef(client.getPlaylistRef(id))!;
}
