import { createStackNavigator, StackCardInterpolatedStyle } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";
import { Appbar } from "react-native-paper";
import HomeScreen from "../screens/Home";
import LibraryScreen from "../screens/LibraryScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import StackHeader from "./StackHeader";

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ navigation, options }) => (
          <Appbar.Header>
            <Appbar.Content color="white" title={options.headerTitle} />
            <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
            <StatusBar backgroundColor="#ff6557" />
          </Appbar.Header>
        )
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'MusicCloud'
        }}
      />
      <Stack.Screen
        name="Playlists"
        component={PlaylistsScreen}
        options={{
          headerTitle: 'Playlists'
        }}
      />
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerTitle: 'Library'
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator