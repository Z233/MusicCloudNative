/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import Index from './src/pages/Index';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';

export default function Main() {
  return (
    <PaperProvider>
      <Index />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
