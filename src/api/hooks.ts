import React, { useContext, useMemo, useCallback } from "react";
import { AppContext } from "../hooks/AppContext";
import { processLoudness } from "../utils/dsp";
import { Api } from ".";

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

export function useLoudnessMap(trackId: number, points: number) {
    const { loudmap: louds } = useClient().getLoudmapResource(trackId).valueRef.useValue();
    return useMemo(() => processLoudness(louds, points), [louds])
}

export function useFavouriteState(track: Api.Track | null) {
    const id = track?.id ?? 0;
    const listres = useFavList();
    const current = !!(listres.valueRef.useValue())?.tracks?.find(t => t.id == id);
    return [current, async (val: boolean) => {
        if (!track) return;
        await listres.waitUntilLoaded();
        const inlist = listres.value?.tracks?.find(t => t.id == id);
        if (!!inlist == val) return;
        if (val) {
            listres.addTrack(track!);
        } else {
            listres.removeTrack(inlist!);
        }
        await listres.put();
    }] as const;
}

function useFavList() {
    const { value: user } = useUserInfo();
    const favListId = user?.lists?.find(l => l.owner === user.id)?.id ?? 0;
    const listres = useClient().getPlaylistResource(favListId);
    return listres;
}

export const commentPaths = {
    track(id: number) { return `tracks/${id}/comments`; },
    myNotes() { return `my/notes`; },
    discussion() { return `discussion`; },
}

export function useComments(path: string) {
    const res = useClient().getCommentsResource(path);
    return {
        state: res.stateRef.useValue(),
        comments: res.valueRef.useValue(),
        postComment: res.postComment.bind(res),
    }
}

export function useSearch() {
    const res = useClient().search;
    return {
        results: res.valueRef.useValue(),
        newSearch: res.newSearch.bind(res),
    }
}
