import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import routes from './Routes';
import _ from 'lodash';
import { useTheme } from 'react-native-paper';
import PlayingBar from '../components/PlayingBar';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackHome from './StackHome';
import StackPlaylists from './StackPlaylists';
import StackLibrary from './StackLibrary';
import { useI18n } from '../i18n/hooks';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const I = useI18n();

  const routes = {
    'home': {
      name: I`首页`,
      icon: 'home',
      component: StackHome
    },
    'playlists': {
      name: I`播放列表`,
      icon: 'history',
      component: StackPlaylists
    },
    'library': {
      name: I`音乐库`,
      icon: 'album',
      component: StackLibrary,
    }
  } as { [K: string]: {
    name: string,
    icon: string,
    component: () => JSX.Element
  } }

  const onPress = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Playing',
      }),
    );
  };

  return (
    <React.Fragment>
      <Tab.Navigator
        backBehavior="none"
        shifting={true}
        activeColor="rgba(255, 255, 255, 1)"
        inactiveColor="rgba(255, 255, 255, 0.74)"
        barStyle={{
          backgroundColor: theme.colors.primary,
        }}>
        {_.map(routes, (route, index) => (
          <Tab.Screen
            key={index}
            name={route.name + '_stack'}
            component={route.component}
            options={{
              title: route.name,
              tabBarIcon: route.icon,
            }}
          />
        ))}
      </Tab.Navigator>
      <PlayingBar onPress={onPress} />
    </React.Fragment>
  );
};

export default TabNavigator;
