/**
 * @format
 */
import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import StackRoot from './src/navigation/StackRoot';
import { RecoilRoot } from 'recoil';
import { AppContext, AppService } from './src/hooks/AppContext';
import TrackPlayer from 'react-native-track-player';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from './src/components/DrawerMenu';
const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff6557',
    accent: 'yellow',
  },
};

const MusicCloud = () => {
  const appService = React.useMemo(() => new AppService(), []);
  React.useEffect(() => {
    return () => appService.destroy();
  }, []);

  return (
    <AppContext.Provider value={appService}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Root"
            screenOptions={{
              headerShown: false,
              swipeEdgeWidth: 0
            }}
            drawerContent={() => <DrawerMenu />}>
            <Drawer.Screen name="Root" component={StackRoot} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => MusicCloud);
TrackPlayer.registerPlaybackService(() => async () => {});
