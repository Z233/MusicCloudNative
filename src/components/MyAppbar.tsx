import React from 'react';
import { StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';

const MyAppbar = (props: {title: string}) => (
  <Appbar.Header>
    <Appbar.Content title={props.title} color="white" />
    <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
    <StatusBar backgroundColor="#ff6557" />
  </Appbar.Header>
);

export default MyAppbar;
