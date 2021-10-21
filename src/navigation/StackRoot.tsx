import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from './TabNavigator';
import PlayingScreen from '../screens/PlayingScreen';
import SecondaryHeader from '../components/SecondaryHeader';
import StackLogin from './StackAuth';
import { useUserInfo, useClient } from '../api';
import { ActivityIndicator, useTheme, IconButton } from 'react-native-paper';
import SearchScreen from '../screens/SearchScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import { RippleOverlay } from '../components/RippleOverlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const BackIconButton = () => {
  const navigation = useNavigation();
  return (
    <IconButton
      icon="chevron-left"
      size={32}
      onPress={() => navigation.goBack()}
    />
  );
};

const StackNavigator = () => {
  const theme = useTheme();
  const client = useClient();
  const { value: userinfo } = useUserInfo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.readSavedInfo().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator
          animating={true}
          color={theme.colors.primary}
          size="large"
        />
      </View>
    );
  if (!userinfo.token) return <StackLogin />;
  return (
    <Stack.Navigator initialRouteName="WithTab">
      <Stack.Screen
        name="WithTab"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Playing"
        component={PlayingScreen}
        options={{
          title: 'Playing',
          header: () => (
            <SecondaryHeader
              title="正在播放"
              backDirection="down"
              dots={() => {}}
            />
          ),
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="设置"
        component={SettingsScreen}
        options={{
          headerLeft: BackIconButton,
        }}
      />
      <Stack.Screen
        name="关于"
        component={AboutScreen}
        options={{
          headerLeft: BackIconButton,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
