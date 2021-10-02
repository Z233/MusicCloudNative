import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";
import { BigItem } from "./BigItem";

interface Props {
  title: string;
  owner: string;
  cover: string;
  onPress: (
    title: Props['title'], 
    owner: Props['owner'],
    cover: Props['cover']
  ) => any;
}

const PlaylistItem = ({ title, owner, cover, onPress }: Props) => (
    <BigItem
      title={title}
      subtitle={owner}
      pic={cover}
      onPress={() => onPress(title, owner, cover)}
    />
)

export default PlaylistItem

export type onPressPlaylistItem = Props['onPress']