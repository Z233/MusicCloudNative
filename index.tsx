/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import StackRoot from './src/navigation/StackRoot';
import { RecoilRoot } from 'recoil';
import { AppContext, AppService } from './src/hooks/AppContext';
import TrackPlayer from "react-native-track-player";

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
          <StackRoot />
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  )
}

AppRegistry.registerComponent(appName, () => MusicCloud);
TrackPlayer.registerPlaybackService(() => async () => {
  
});
