import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PrimaryHeader from '../components/PrimaryHeader';
import LibraryScreen from '../screens/LibraryScreen';
import { useScreenState } from '../utils/screen';

const Stack = createStackNavigator();

const StackLibrary = () => {
  const screenState = useScreenState();
  return (
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen
        name="Library"
        children={() => <LibraryScreen screenState={screenState} />}
        options={{
          header: () => <PrimaryHeader screenState={screenState} />
        }}
      />
    </Stack.Navigator>
  );
};

export default StackLibrary;
