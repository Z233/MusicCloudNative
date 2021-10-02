import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import React from "react";
import { StatusBar, View } from "react-native";
import { Appbar } from "react-native-paper";
import HomeScreen from "../screens/Home";
import LibraryScreen from "../screens/LibraryScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import TabNavigator from "./TabNavigator";
import routes from "./Routes";
import Icon from "react-native-vector-icons/MaterialIcons";
import PlayingScreen from "../screens/PlayingScreen";

const Stack = createStackNavigator()

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

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
      <Stack.Screen
        name="Playing"
        component={PlayingScreen}
        options={{
          title: 'Playing',
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator