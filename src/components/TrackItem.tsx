import { BigItem } from './BigItem';
import { Api } from '../api';
import React from 'react';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';

export function showTrackDetailModal(
  track: Api.Track,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) {
  navigation.dispatch(CommonActions.navigate({
    name: 'TrackDetailModal',
    params: {
      track
    }
  }))
}

export default function TrackItem(props: {
  track: Api.Track;
  onPress: (track: Api.Track) => void;
}) {
  const navigation = useNavigation();
  return (
    <BigItem
      title={props.track.name}
      subtitle={props.track.artist}
      pic={props.track.thumburl}
      onPress={() => {
        props.onPress(props.track);
      }}
      onPressMore={() => showTrackDetailModal(props.track, navigation)}
    />
  );
}
