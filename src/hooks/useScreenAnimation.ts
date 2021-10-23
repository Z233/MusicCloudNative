import { useNavigation } from '@react-navigation/core';
import { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function useScreenAnimation() {
  const navigation = useNavigation();
  const [curRouteName, setCurRouteName] = useState(
    navigation.getState().routeNames[0],
  );

  const fadeAnim = useRef(
    new Animated.Value(
      navigation.isFocused() && navigation.getState().routes[0].name === 'Home'
        ? 1
        : 0,
    ),
  ).current;

  const FADE_DURATION = 350;

  useEffect(() => {
    const listeners = [
      navigation.addListener('focus', () => {
        // Will change fadeAnim value to 1 in FADE_DURATION miliseconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }).start();
      }),

      navigation.addListener('blur', () => {
        if (navigation.canGoBack()) return;
        fadeAnim.setValue(0);
      }),
    ];

    return () => listeners.forEach(x => x());
  }, []);

  return {
    opacity: fadeAnim,
  };
}
