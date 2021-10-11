import TrackPlayer from "react-native-track-player";
import { Api } from "../api";
import { Ref } from "../utils/webfx";

async function init() {
    await TrackPlayer.setupPlayer();
}

export class Player {
    playing = new Ref<Api.Track | null>(null);

    async playTrack(track: Api.Track) {
        this.playing.value = track;
        await init();
        await TrackPlayer.add({
            url: track.url
        });
        await TrackPlayer.play();
    }
}