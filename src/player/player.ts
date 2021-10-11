import TrackPlayer, { Event, State } from "react-native-track-player";
import { Api } from "../api";
import { Ref } from "../utils/webfx";

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
    private positionTimer: NodeJS.Timer | null = null;
    private stateCallback = ({ state }: any) => {
        this.state.value = state;
        this.isPlaying.value = playingStates.includes(state);
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

    constructor() {
        TrackPlayer.addEventListener(Event.PlaybackState, this.stateCallback);
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
            url: track.url
        });
        await TrackPlayer.play();
    }

    async pause() {
        await TrackPlayer.pause();
    }

    async play() {
        await TrackPlayer.play();
    }

    destroy() {
        TrackPlayer.stop().then(() => TrackPlayer.destroy());
    }
}