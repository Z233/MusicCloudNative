import { CommonActions, useNavigation } from '@react-navigation/core';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { onPressPlaylistItem } from '../components/PlaylistItem';
import PrimaryHeader from '../components/PrimaryHeader';
import SecondaryHeader from '../components/SecondaryHeader';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';

const Stack = createStackNavigator();

const StackPlaylists = () => {
  const navigation = useNavigation();
  const screenTransition = TransitionPresets.SlideFromRightIOS;

  const onPressPlaylist: onPressPlaylistItem = (id) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Playlist',
        params: {
          id
        },
      }),
    );
  };

  return (
    <Stack.Navigator initialRouteName="Playlists">
      <Stack.Screen
        options={{
          ...screenTransition,
          header: PrimaryHeader,
        }}
        name="Playlists">
        {() => <PlaylistsScreen onPressPlaylist={onPressPlaylist} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          ...screenTransition,
          headerShown: false
        }}
        name="Playlist"
        component={PlaylistDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default StackPlaylists;
