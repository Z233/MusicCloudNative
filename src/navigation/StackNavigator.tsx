import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";
import { Appbar } from "react-native-paper";
import HomeScreen from "../screens/Home";
import LibraryScreen from "../screens/LibraryScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import TabNavigator from "./TabNavigator";
import routes from "./Routes";

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ navigation, options, route }) => {
          const title = options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
            ? options.title
            : route.name

          return (
            <Appbar.Header>
              <Appbar.Content color="white" title={title} />
              <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
              <StatusBar backgroundColor="#ff6557" />
            </Appbar.Header>
          )
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route)
          return { headerTitle: routeName }
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator