import React, { Children, useState } from 'react';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = React.PropsWithChildren<{
  onPress: () => void;
}>;

const TouchableCustom = (props: Props) => {
  const pressed = useSharedValue(false);
  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: pressed.value ? 0.98 : 1,
        },
      ],
    };
  });
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      onPressIn={() => pressed.value = true}
      onPressOut={() => pressed.value = false}>
      <Animated.View style={[uas]}>
        {props.children ?? Children.only(props.children)}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TouchableCustom;
