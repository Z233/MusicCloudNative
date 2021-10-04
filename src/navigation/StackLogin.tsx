import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PrimaryHeader from '../components/PrimaryHeader';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const StackLogin = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default StackLogin;
