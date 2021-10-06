import { useNavigation } from "@react-navigation/core";
import { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

export default function useScreenAnimation() {
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

  const FADE_DURATION = 350

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();
  };

  return {
    opacity: fadeAnim
  }
}