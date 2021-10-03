/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import StackRoot from './src/navigation/StackRoot';
import PlayingBar from './src/components/PlayingBar';
import { RecoilRoot } from 'recoil';

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
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StackRoot />
      </NavigationContainer>
    </PaperProvider>
  </RecoilRoot>
)

AppRegistry.registerComponent(appName, () => MusicCloud);
