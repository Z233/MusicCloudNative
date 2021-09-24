/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import MainContainer from './src/containers/MainContainer';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import MyAppbar from './src/components/MyAppbar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff6557',
    accent: 'yellow',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
