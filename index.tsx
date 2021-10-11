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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff6557',
    accent: 'yellow',
  },
};

const MusicCloud = () => (
  <RecoilRoot>
    <AppContext.Provider value={new AppService()}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StackRoot />
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  </RecoilRoot>
)

AppRegistry.registerComponent(appName, () => MusicCloud);
