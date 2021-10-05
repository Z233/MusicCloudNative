import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-expect-error
import headerBg from '../assets/header-bg.png';
import layout from '../styles/layout';

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

const AuthHeader = ({ title, subtitle, showBack }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        paddingHorizontal: 32,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <View
        style={{
          height: statusBarHeight,
          width: Dimensions.get('screen').width,
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <Image source={headerBg} style={styles.headerBg} resizeMode="cover" />
      <View style={styles.headerContainer}>
        {showBack ? (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              style={{
                marginBottom: 16,
              }}
              name="arrow-left-drop-circle-outline"
              size={40}
              color="white"
            />
          </TouchableWithoutFeedback>
        ) : null}
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBg: {
    height: 256,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    resizeMode: 'stretch',
    top: StatusBar.currentHeight,
    left: 0,
  },
  headerContainer: {
    height: 256,
    display: 'flex',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default AuthHeader;
