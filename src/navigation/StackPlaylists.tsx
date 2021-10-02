import { CommonActions, useNavigation } from '@react-navigation/core'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { onPressPlaylistItem } from '../components/PlaylistItem'
import PlaylistScreen from '../screens/PlaylistScreen'
import PlaylistsScreen from '../screens/PlaylistsScreen'

const Stack = createStackNavigator()

const StackPlaylists = () => {

  const navigation = useNavigation()

  const onPressPlaylist: onPressPlaylistItem = (title, owner, cover) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Playlist',
        params: {
          title,
          owner,
          cover
        }
      })
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Playlists">
      <Stack.Screen
        name="Playlists">
        {() => <PlaylistsScreen onPressPlaylist={onPressPlaylist} />}
      </Stack.Screen>
      <Stack.Screen
        name="Playlist"
        component={PlaylistScreen}
      />
    </Stack.Navigator>
  )
}

export default StackPlaylists