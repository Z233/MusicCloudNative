import React, { useEffect, useRef } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isOffsetTopState } from '../store';

const PrimaryHeader = () => {
  const statusHeight = StatusBar.currentHeight!;
  const isOffsetTop = useRecoilValue(isOffsetTopState);
  const fadeAnim = useRef(new Animated.Value(isOffsetTop ? 1 : 0)).current;
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
    if (isOffsetTop) fadeIn()
    else if (!isOffsetTop) fadeOut()
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
