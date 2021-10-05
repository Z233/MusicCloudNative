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

const Stack = createStackNavigator();



const StackNavigator = () => {
  const client = useClient();
  const userinfo = useUserInfo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.readSavedInfo().then(() => {
      setLoading(false);
    });
  }, []);


  if (loading) return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>(UI TODO) Loading...</Text>
    </View>
  )
  if (!userinfo.token) return <StackLogin />
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
          header: () => <SecondaryHeader title="正在播放" backDirection='down' dots={() => { }} />,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  )
};

export default StackNavigator;
