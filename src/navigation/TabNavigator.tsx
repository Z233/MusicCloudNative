import HomeScreen from "../screens/Home";
import LibraryScreen from "../screens/LibraryScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import * as React from 'react'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from "./Routes";
import _ from 'lodash'
import { useTheme } from "react-native-paper";
import PlayingBar from "../components/PlayingBar";


const Tab = createMaterialBottomTabNavigator()

const TabNavigator = () => {
  const theme = useTheme()
  
  return (
    <Tab.Navigator
      activeColor="rgba(255, 255, 255, 1)"
      inactiveColor="rgba(255, 255, 255, 0.74)"
      barStyle={{
        backgroundColor: theme.colors.primary,
      }}
    >
      {_.map(routes, route => (
        <Tab.Screen 
          name={route.name}
          component={route.component}
          options={{
            tabBarIcon: route.icon,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default TabNavigator