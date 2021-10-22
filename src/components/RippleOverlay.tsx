import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const RippleOverlay = (props: { onPress?: () => void }) => (
  <TouchableRipple
    onPress={props.onPress}
    rippleColor="rgba(0, 0, 0, .2)"
    style={{ position: 'absolute', width: '100%', height: '100%' }}>
    <View></View>
  </TouchableRipple>
);
