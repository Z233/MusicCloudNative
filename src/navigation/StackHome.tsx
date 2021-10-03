import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PrimaryHeader from '../components/PrimaryHeader';
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: PrimaryHeader
        }}
      />
    </Stack.Navigator>
  );
};

export default StackHome;
