/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import PlayingBar from './src/components/PlayingBar';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff6557',
    accent: 'yellow',
  },
};

const MusicCloud = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <StackNavigator />
      <PlayingBar />
    </NavigationContainer>
  </PaperProvider>
)

AppRegistry.registerComponent(appName, () => MusicCloud);
