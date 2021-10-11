import { Playlist } from "../api";
import { arraySum } from "./webfx";

/** Returns "__ 小时 __ 分钟" */
export function formatTimeLong(sec: number) {
    const mins = Math.round(sec / 60);
    const [hour, minutes] = [Math.round(mins / 60), mins % 60];
    let str = '';
    if (hour) str += hour + ' 小时 ';
    str += minutes + ' 分钟';
    return str;
}

/** Returns total seconds */
export function getTracksTotalLength(tracks: Playlist['tracks']) {
    return !tracks ? 0 : Math.round(arraySum(tracks, x => x.length));
}
