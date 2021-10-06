import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import routes from './Routes';
import _ from 'lodash';
import { useTheme } from 'react-native-paper';
import PlayingBar from '../components/PlayingBar';
import { CommonActions, useNavigation } from '@react-navigation/core';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  const theme = useTheme();

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
        shifting={true}
        activeColor="rgba(255, 255, 255, 1)"
        inactiveColor="rgba(255, 255, 255, 0.74)"
        barStyle={{
          backgroundColor: theme.colors.primary,
        }}>
        {_.map(routes, (route, index) => (
          <Tab.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={{
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
