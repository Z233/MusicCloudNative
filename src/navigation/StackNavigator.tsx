import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, View } from "react-native";
import { Appbar } from "react-native-paper";
import HomeScreen from "../screens/Home";
import LibraryScreen from "../screens/LibraryScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import TabNavigator from "./TabNavigator";
import routes from "./Routes";
import Icon from "react-native-vector-icons/MaterialIcons";

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
            <View style={{ height: 56, flexDirection: 'row', justifyContent: 'space-between', elevation: 1 }}>
              <Icon style={{ marginLeft: 16, marginVertical: 16 }} name="menu" size={24} color="black" />
              <Icon style={{ marginRight: 16, marginVertical: 16 }} name="search" size={24} color="black" />
            </View>
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