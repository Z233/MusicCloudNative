import TrackPlayer, { Event, State, Capability } from "react-native-track-player";
import { Api } from "../api";
import { Ref } from "../utils/webfx";
import { AppService } from "../hooks/AppContext";

export { State } from "react-native-track-player";

const playingStates = [State.Playing, State.Buffering, State.Connecting]

export class Player {
    track = new Ref<Api.Track | null>(null);
    state = new Ref<State>(State.None);
    isPlaying = new Ref<boolean>(false);
    /** Seconds */
    position = new Ref<number>(0);
    /** 0 to 1 */
    positionRatio = new Ref<number>(0);

    private inited = false;
    private destoryed = false;
    private positionTimer: NodeJS.Timer | null = null;
    private stateCallback = ({ state }: any) => {
        if (this.destoryed) return;
        this.state.value = state;
        this.isPlaying.setIfChanged(playingStates.includes(state));
        console.info('player', State[state]);
        if (this.isPlaying.value !== (this.positionTimer != null)) {
            if (this.isPlaying.value) {
                this.positionTimer = setInterval(() => {
                    TrackPlayer.getPosition().then(x => {
                        this.position.value = x;
                        const total = this.track.value?.length;
                        this.positionRatio.value = total ? x / total : 0;
                    });
                }, 250);
            } else {
                clearInterval(this.positionTimer!);
                this.positionTimer = null;
            }
        }
    };

    constructor(readonly app: AppService) {
        TrackPlayer.updateOptions({
            capabilities: [Capability.Pause, Capability.Play, Capability.Skip]
        })
        TrackPlayer.addEventListener(Event.PlaybackState, this.stateCallback);
        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, ({ track, nextTrack }) => {
            console.info("track changed", track, nextTrack);
        });
        TrackPlayer.addEventListener(Event.RemotePlay, () => {
            this.play();
        });
        TrackPlayer.addEventListener(Event.RemotePause, () => {
            this.pause();
        });
    }

    async init() {
        if (this.inited) return;
        this.inited = true;
        await TrackPlayer.setupPlayer();
    }

    async playTrack(track: Api.Track) {
        this.track.value = track;
        await this.init();
        await TrackPlayer.reset();
        await TrackPlayer.add({
            url: track.url,
            artwork: track.picurl,
            title: track.name,
            artist: track.artist,
            album: track.album,
            duration: track.length,
        });
        await TrackPlayer.play();
        this.app.apiClient.addPlayingRecord(track);
    }

    async pause() {
        await TrackPlayer.pause();
    }

    async play() {
        await TrackPlayer.play();
    }

    destroy() {
        this.destoryed = true;
        TrackPlayer.stop().then(() => TrackPlayer.destroy());
    }
}