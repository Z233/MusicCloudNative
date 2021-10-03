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

  const onPressPlaylist: onPressPlaylistItem = (title, owner, cover) => {
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
          header: (props) => <SecondaryHeader title="" />,
        }}
        name="Playlist"
        component={PlaylistDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default StackPlaylists;
