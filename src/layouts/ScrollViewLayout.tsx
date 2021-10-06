import React, { Children } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { isOffsetTopState, getOnScroll } from '../store';
import layout from '../styles/layout';

type Props = React.PropsWithChildren<{}>;

export const ScrollViewLayout = (props: Props) => {
  return (
    <ScrollView style={layout.container} onScroll={getOnScroll()}>
      {props.children}
    </ScrollView>
  );
};
