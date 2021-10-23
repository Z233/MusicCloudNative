import TrackPlayer, { Event, State, Capability, RepeatMode, Track } from "react-native-track-player";
import { Api, Playlist, PlaylistResource } from "../api";
import { Ref } from "../utils/webfx";
import { AppService } from "../hooks/AppContext";
import { EmitterSubscription } from "react-native";

export { State } from "react-native-track-player";

const playingStates = [State.Playing, State.Buffering, State.Connecting]

export class Player {
    track = new Ref<Api.Track | null>(null);
    list = new Ref<Playlist | null>(null);
    state = new Ref<State>(State.None);
    isPlaying = new Ref<boolean>(false);
    /** Seconds */
    position = new Ref<number>(0);
    /** 0 to 1 */
    positionRatio = new Ref<number>(0);

    buffered = new Ref<number>(0);
    bufferedRatio = new Ref<number>(0);

    private inited = false;
    private destoryed = false;
    private positionTimer: NodeJS.Timer | null = null;
    private stateCallback = ({ state }: any) => {
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
                    TrackPlayer.getBufferedPosition().then(x => {
                        this.buffered.value = x;
                        const total = this.track.value?.length;
                        this.bufferedRatio.value = total ? x / total : 0;
                    });
                }, 250);
            } else {
                clearInterval(this.positionTimer!);
                this.positionTimer = null;
            }
        }
    };

    private subscribtions: EmitterSubscription[];

    constructor(readonly app: AppService) {
        TrackPlayer.updateOptions({
            capabilities: [
                Capability.Pause,
                Capability.Play,
                Capability.Skip,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
            ]
        });
        this.track.onChanged.add(() => {
            console.info('player.track', this.track.value);
        })
        this.subscribtions = [
            TrackPlayer.addEventListener(Event.PlaybackState, this.stateCallback),
            TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async ({ track: prevTrack, nextTrack: track }) => {
                prevTrack = prevTrack != null && await TrackPlayer.getTrack(prevTrack)
                track = track != null && await TrackPlayer.getTrack(track)
                if (prevTrack == track) return;
                console.info("track changed", track?._id, prevTrack?._id);
                if (track) {
                    if (track._pos != null && this.list.value) {
                        this.track.value = this.list.value.tracks[track._pos];
                    } else if (this.track.value?.id === track._id) {
                        // noop
                    } else {
                        console.warn("unknown track from queue", {current: this.track.value, api: track});
                    }
                } else {
                    // this.track.value = null;
                }
            }),
            TrackPlayer.addEventListener(Event.RemotePlay, () => {
                this.play();
            }),
            TrackPlayer.addEventListener(Event.RemotePause, () => {
                this.pause();
            }),
            TrackPlayer.addEventListener(Event.RemoteNext, () => {
                this.next();
            }),
            TrackPlayer.addEventListener(Event.RemotePrevious, () => {
                this.prev();
            }),
        ];
    }

    async init() {
        if (this.inited) return;
        this.inited = true;
        await TrackPlayer.setupPlayer();
    }

    async playTrack(track: Api.Track, list?: Playlist, pos?: number) {
        this.track.value = track;
        console.info('.value', this.track.value)
        console.info('track', track)
        await this.init();
        await TrackPlayer.reset();
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        if (!list && track._list) {
            list = await this.app.apiClient.getPlaylistResource(track._list).valueRef.value;
        }
        this.list.value = list ?? null;
        if (list?.tracks?.length ?? 0 > 0) {
            const _pos = pos ?? list!.tracks.findIndex(t => t.id === track.id)!;
            const tracks = [...list!.tracks.slice(_pos), ...list!.tracks.slice(0, _pos)]
            const upTracks = tracks.map((track, i) => ({
                url: track.url,
                artwork: track.picurl ?? '',
                title: track.name,
                artist: track.artist,
                album: track.album,
                duration: track.length ?? 0,
                _id: track.id,
                _list: list!.id,
                _pos: track._pos,
            } as Track));
            await TrackPlayer.add(upTracks);
        } else {
            await TrackPlayer.add({
                url: track.url,
                artwork: track.picurl ?? '',
                title: track.name,
                artist: track.artist,
                album: track.album,
                duration: track.length,
                _id: track.id,
            });
        }
        await TrackPlayer.play();
        this.app.apiClient.addPlayingRecord(track);
    }

    async pause() {
        await TrackPlayer.pause();
    }

    async play() {
        await TrackPlayer.play();
    }

    async next() {
        await TrackPlayer.skipToNext();
    }

    async prev() {
        await TrackPlayer.skipToPrevious();
    }

    destroy() {
        if (this.destoryed) console.warn("destroy() more than once");
        this.destoryed = true;
        this.subscribtions.forEach(x => x.remove());
        TrackPlayer.stop().then(() => TrackPlayer.destroy());
    }
}