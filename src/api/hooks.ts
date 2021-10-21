import React, { useContext } from "react";
import { AppContext } from "../hooks/AppContext";

export function useClient() {
    return useContext(AppContext).apiClient;
}

export function useUserInfo() {
    return useClient().userInfo.use();
}

export function usePlaylist(id: number) {
    return useClient().getPlaylistResource(id).use();
}

export function useUploads() {
    return useClient().uploads.use(true);
}

export function useRecentPlays() {
    return useClient().recentplays.use(true);
}
