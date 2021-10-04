import React from "react";
import { BigItem } from "./BigItem";

interface Props {
  id: number;
  title: string;
  owner: string;
  cover: string;
  onPress: (id: number) => any;
}

const PlaylistItem = (props: Props) => (
    <BigItem
      title={props.title}
      subtitle={props.owner}
      pic={props.cover}
      onPress={() => props.onPress(props.id)}
    />
)

export default PlaylistItem

export type onPressPlaylistItem = Props['onPress']