import React from "react"
import { StatusBar, Text, View } from "react-native"
import { BottomNavigation } from "react-native-paper"
import HomePage from "../pages/HomePage"
import LibraryPage from "../pages/LibraryPage"
import PlaylistsPage from "../pages/PlaylistsPage"


const MainContainer = () => {
  return (
    <BottomNav />
    // <View>

    // </View>
  )
}

export default MainContainer;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: '首页', icon: 'home' },
    { key: 'playlists', title: '播放列表', icon: 'history' },
    { key: 'library', title: '音乐库', icon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomePage />,
    playlists: () => <PlaylistsPage />,
    library: () => <LibraryPage />,
  });
  return (
    <BottomNavigation
      activeColor="white"
      inactiveColor="rgba(255, 255, 255, 0.74)"
      navigationState={{ index, routes }}
      onIndexChange={x => {console.info('nav', x); setIndex(x);}}
      renderScene={renderScene}
    />
  );
}