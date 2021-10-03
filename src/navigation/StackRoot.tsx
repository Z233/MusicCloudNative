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
import SecondaryHeader from "../components/SecondaryHeader";
import PrimaryHeader from "../components/PrimaryHeader";

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
      initialRouteName="WithTab"
    >
      <Stack.Screen
        name="WithTab"
        component={TabNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Playing"
        component={PlayingScreen}
        options={{
          title: 'Playing',
          header: () => (
            <SecondaryHeader title='正在播放' backDirection='down' dots={() => { }} />
          ),
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator