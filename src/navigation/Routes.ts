import React from "react"
import HomeScreen from "../screens/Home"
import LibraryScreen from "../screens/LibraryScreen"
import PlaylistsScreen from "../screens/PlaylistsScreen"

const routes = {
  'home': {
    name: '首页',
    icon: 'home',
    component: HomeScreen
  },
  'playlists': {
    name: '播放列表',
    icon: 'history',
    component: PlaylistsScreen
  },
  'library': {
    name: '音乐库',
    icon: 'album',
    component: LibraryScreen,
  }
} as { [K: string]: {
  name: string,
  icon: string,
  component: () => JSX.Element
} }

export default routes