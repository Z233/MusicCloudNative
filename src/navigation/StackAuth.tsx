import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import AuthHeader from '../components/AuthHeader';
import PrimaryHeader from '../components/PrimaryHeader';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const StackLogin = () => {
  const theme = useTheme();
  const screenTransition = TransitionPresets.SlideFromRightIOS;
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: ({ options }) => {
            return (
              <AuthHeader
                title={options.headerTitle as string}
                subtitle={options.headerBackTitle}
                showBack={!options.headerBackTitleVisible}
              />
            );
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            ...screenTransition,
            headerTitle: 'Music Cloud',
            headerBackTitle: '登录以继续使用',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            ...screenTransition,
            headerTitle: '创建账号',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackLogin;
