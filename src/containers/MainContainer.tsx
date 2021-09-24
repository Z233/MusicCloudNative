import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeScreen from '../screens/Home';
import LibraryScreen from '../screens/LibraryScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';

const MainContainer = () => {
  return (
    <BottomNav />
  );
};

export default MainContainer;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: '首页', icon: 'home' },
    { key: 'playlists', title: '播放列表', icon: 'history' },
    { key: 'library', title: '音乐库', icon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen />,
    playlists: () => <PlaylistsScreen />,
    library: () => <LibraryScreen />,
  });
  return (
    <BottomNavigation
      activeColor="white"
      inactiveColor="rgba(255, 255, 255, 0.74)"
      navigationState={{ index, routes }}
      onIndexChange={x => {
        console.info('nav', x);
        setIndex(x);
      }}
      renderScene={renderScene}
    />
  );
};
