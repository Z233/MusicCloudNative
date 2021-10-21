import React, { Children } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GenericTouchable from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import { TouchableOpacityBase, TouchableNativeFeedback } from 'react-native';

type Props = React.PropsWithChildren<{
  onPress: () => unknown;
}>;

const TouchableCustom = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}>
      {Children.map(props.children, x => x)}
    </TouchableOpacity>
  );
};

export default TouchableCustom;
