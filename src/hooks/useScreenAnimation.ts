import { useNavigation } from "@react-navigation/core";
import { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

export default function useScreenAnimation() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const FADE_DURATION = 350

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
        fadeAnim.setValue(0);
      }),
    ];

    return () => listeners.forEach(x => x());
  }, []);

  return {
    opacity: fadeAnim
  }
}