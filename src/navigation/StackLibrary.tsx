import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PrimaryHeader from '../components/PrimaryHeader';
import LibraryScreen from '../screens/LibraryScreen';

const Stack = createStackNavigator();

const StackLibrary = () => {
  return (
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          header: PrimaryHeader
        }}
      />
    </Stack.Navigator>
  );
};

export default StackLibrary;
