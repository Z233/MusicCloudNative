import { CommonActions, useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { onPressPlaylistItem } from '../components/PlaylistItem';
import PrimaryHeader from '../components/PrimaryHeader';
import SecondaryHeader from '../components/SecondaryHeader';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';

const Stack = createStackNavigator();

const StackPlaylists = () => {
  const navigation = useNavigation();
  const [curPlaylistTitle, setCurPlaylistTitle] = useState('');

  const onPressPlaylist: onPressPlaylistItem = (title, owner, cover) => {
    setCurPlaylistTitle(title);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Playlist',
        params: {
          title,
          owner,
          cover,
        },
      }),
    );
  };

  return (
    <Stack.Navigator initialRouteName="Playlists">
      <Stack.Screen
        options={{
          header: PrimaryHeader,
        }}
        name="Playlists">
        {() => <PlaylistsScreen onPressPlaylist={onPressPlaylist} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          header: () => <SecondaryHeader title={curPlaylistTitle} />,
        }}
        name="Playlist"
        component={PlaylistDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default StackPlaylists;
