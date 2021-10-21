import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
} from 'react-native';
import { getOnScroll } from '../store';
import layout from '../styles/layout';

type Props = React.PropsWithChildren<{}>;

export const ScrollViewLayout = (props: Props) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const listeners = [
      navigation.addListener('focus', () => {
        fadeIn();
      }),

      navigation.addListener('blur', () => {
        fadeOut();
      }),
    ];

    return () => {
      listeners.forEach(rm => rm())
    };
  }, []);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.ScrollView
      style={{
        ...layout.container,
        opacity: fadeAnim,
      }}
      onScroll={getOnScroll()}>
      {props.children}
    </Animated.ScrollView>
  );
};
