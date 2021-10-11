import React, { useContext } from "react";
import { ApiClient, UserInfo, Playlist } from "./client";
import { useWebfxRef } from "../utils/webfxForReact";
import { AppContext } from "../hooks/AppContext";

export function useClient() {
    return useContext(AppContext).apiClient;
}

export function useUserInfo(): UserInfo {
    return useWebfxRef(useClient().userInfo)!;
}

export function usePlayList(id: number): Playlist {
    const client = useClient();
    return useWebfxRef(client.getPlaylistRef(id))!;
}
