import React, { Children } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { isOffsetTopState } from '../store';
import layout from '../styles/layout';

type Props = React.PropsWithChildren<{}>;

export const ScrollViewLayout = (props: Props) => {
  const [isOffsetTop, setIsOffsetTop] = useRecoilState(isOffsetTopState)

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y
    if (!isOffsetTop && offsetY > 0) setIsOffsetTop(true)
    else if (isOffsetTop && offsetY <= 0) setIsOffsetTop(false)
  };

  return (
    <ScrollView style={layout.container} onScroll={onScroll}>
      {props.children}
    </ScrollView>
  );
};
