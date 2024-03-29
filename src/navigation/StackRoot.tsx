import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
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
import TrackDetailModal from '../components/modal/TrackDetailModal';
import PlaylistDetailModal from '../components/modal/PlaylistDetailModal';
import { useI18n } from '../i18n/hooks';
import CommentsScreen from '../screens/CommentsScreen';
import { useApp } from '../hooks/AppContext';

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
  const app = useApp();
  const { value: userinfo } = useUserInfo();
  const [loading, setLoading] = useState(true);
  const I = useI18n();

  useEffect(() => {
    app.init().then(() => {
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

      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: 'transparentModal',
          cardOverlayEnabled: true,
          gestureEnabled: true,
          gestureResponseDistance: 1000,
          ...TransitionPresets.ModalPresentationIOS,
          keyboardHandlingEnabled: true,
        }}>
        <Stack.Screen name="TrackDetailModal" component={TrackDetailModal} />
        <Stack.Screen
          name="PlaylistDetailModal"
          component={PlaylistDetailModal}
        />
      </Stack.Group>

      <Stack.Screen
        name="Playing"
        component={PlayingScreen}
        options={{
          title: 'Playing',
          headerShown: false,
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
        name="Settings"
        component={SettingsScreen}
        options={{
          title: I`设置`,
          headerLeft: BackIconButton,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: I`关于`,
          headerLeft: BackIconButton,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
