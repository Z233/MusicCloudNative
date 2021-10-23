import React from 'react';
import { BigItem } from './BigItem';
import {
  useNavigation,
  CommonActions,
  NavigationProp,
} from '@react-navigation/native';

interface Props {
  id: number;
  title: string;
  owner: string;
  cover: string;
  onPress: (id: number) => any;
}

const PlaylistItem = (props: Props) => {
  const navigation = useNavigation();
  return (
    <BigItem
      title={props.title}
      subtitle={props.owner}
      pic={props.cover}
      onPress={() => props.onPress(props.id)}
      onPressMore={() =>
        navigation.dispatch(
          CommonActions.navigate({
            name: 'PlaylistDetailModal',
            params: {
              title: props.title,
              owner: props.owner,
              cover: props.cover
            },
          }),
        )
      }
    />
  );
};

export default PlaylistItem;

export type onPressPlaylistItem = Props['onPress'];
