import React, { Children, useState } from 'react';
import {
  TouchableOpacity,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import GenericTouchable from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import {
  TouchableOpacityBase,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = React.PropsWithChildren<{
  onPress: () => void;
}>;

const TouchableCustom = (props: Props) => {
  const [center, setCenter] = useState([0, 0]);
  const pressed = useSharedValue(false);
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
    },
  });
  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: pressed.value ? 0.98 : 1,
        },
      ],
      opacity: pressed.value ? 0.6 : 1,
    };
  });
  return (
    // @ts-expect-error
    <TapGestureHandler onActivated={props.onPress} onGestureEvent={eventHandler}>
      <Animated.View
        onLayout={e => {
          const layout = e.nativeEvent.layout;
          setCenter([layout.width / 2, layout.height / 2]);
        }}
        style={[uas]}>
        {props.children ?? Children.only(props.children)}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default TouchableCustom;
