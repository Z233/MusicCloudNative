import React, { useEffect, useRef } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Ref } from '../utils/webfx';
import { ScreenState } from '../utils/screen';

const PrimaryHeader = ({ screenState }: { screenState: ScreenState }) => {
  const statusHeight = StatusBar.currentHeight!;
  const isOffsetTop = screenState.useIsOffsetTop();
  const fadeAnim = useRef(new Animated.Value(isOffsetTop ? 0 : 1)).current;
  const FADE_DURATION = 100

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: false
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: FADE_DURATION,
      useNativeDriver: false
    }).start()
  }

  // 1: true, 0: false
  const bgColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
  })

  useEffect(() => {
    if (isOffsetTop) fadeOut()
    else fadeIn()
  }, [isOffsetTop])


  return (
    <Animated.View
      style={{
        paddingTop: statusHeight,
        height: statusHeight! + 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: bgColor
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Icon
        style={{ marginLeft: 16, marginVertical: 16 }}
        name="menu"
        size={24}
        color="black"
      />
      <Icon
        style={{ marginRight: 16, marginVertical: 16 }}
        name="search"
        size={24}
        color="black"
      />
    </Animated.View>
  );
};

export default PrimaryHeader;
