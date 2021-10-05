import { createStackNavigator, TransitionPresets, TransitionSpecs } from '@react-navigation/stack';
import React from 'react';
import PrimaryHeader from '../components/PrimaryHeader';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const StackLogin = () => {
  const screenTransition = TransitionPresets.SlideFromRightIOS
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          ...screenTransition
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          ...screenTransition
        }}
      />
    </Stack.Navigator>
  );
};

export default StackLogin;
