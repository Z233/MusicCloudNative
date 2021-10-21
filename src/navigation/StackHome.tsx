import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PrimaryHeader from '../components/PrimaryHeader';
import HomeScreen from '../screens/Home';
import { useScreenState } from '../utils/screen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();

const StackHome = () => {
  const screenState = useScreenState();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        children={() => <HomeScreen screenState={screenState} />}
        options={{
          header: () => <PrimaryHeader screenState={screenState} />
        }}
      />
    </Stack.Navigator>
  );
};

export default StackHome;
