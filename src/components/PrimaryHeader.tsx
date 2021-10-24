import React, { useEffect, useRef } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Ref } from '../utils/webfx';
import { ScreenState } from '../utils/screen';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import {
  CommonActions,
  useNavigation,
  DrawerActions,
} from '@react-navigation/core';
import { RippleOverlay } from './RippleOverlay';

interface IconOverlayProps {
  icon: string;
  onPress: () => void;
}

const PrimaryIconButton = ({ icon, onPress }: IconOverlayProps) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
    <Icon name={icon} size={24} color="black" />
    <RippleOverlay onPress={onPress} />
  </View>
);

const PrimaryHeader = ({ screenState }: { screenState: ScreenState }) => {
  const navigation = useNavigation();

  const statusHeight = StatusBar.currentHeight!;
  const isOffsetTop = screenState.useIsOffsetTop();
  const fadeAnim = useRef(new Animated.Value(isOffsetTop ? 0 : 1)).current;
  const FADE_DURATION = 100;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: FADE_DURATION,
      useNativeDriver: false,
    }).start();
  };

  // 1: true, 0: false
  const bgColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
  });

  useEffect(() => {
    if (isOffsetTop) fadeOut();
    else fadeIn();
  }, [isOffsetTop]);

  return (
    <Animated.View
      style={{
        paddingTop: statusHeight,
        height: statusHeight! + 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: bgColor,
        paddingHorizontal: 8,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <PrimaryIconButton
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        {navigation.getState().routeNames[0] === 'Library' ? (
          <PrimaryIconButton
            icon="upload-file"
            onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Search',
                }),
              );
            }}
          />
        ) : null}
        <PrimaryIconButton
          icon="search"
          onPress={() => {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Search',
              }),
            );
          }}
        />
      </View>
    </Animated.View>
  );
};

export default PrimaryHeader;
