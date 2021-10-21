import { BigItem } from "./BigItem";
import { Api } from "../api";
import React from "react";

export default function TrackItem(props: { track: Api.Track; onPress: (track: Api.Track) => void }) {
    return (
        <BigItem
            title={props.track.name}
            subtitle={props.track.artist}
            pic={props.track.thumburl}
            onPress={() => { props.onPress(props.track); }}
        />
    );
}