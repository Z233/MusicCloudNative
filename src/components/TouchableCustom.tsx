import React, { Children } from 'react';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GenericTouchable from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import { TouchableOpacityBase, TouchableNativeFeedback, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';

type Props = React.PropsWithChildren<{
  onPress: () => unknown;
}>;

const handlePressIn = (e: GestureResponderEvent) => {
  console.log(e);
  
};

const TouchableCustom = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn}>
      {props.children ?? Children.only(props.children) }
    </TouchableWithoutFeedback>
  );
};

export default TouchableCustom;
