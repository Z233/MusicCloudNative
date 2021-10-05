import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import layout from '../styles/layout';
//@ts-expect-error
import headerBg from '../assets/header-bg.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

const RegisterScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View style={layout.loginContainer}>
        <Image source={headerBg} style={styles.headerBg} />
        <View style={styles.headerContainer}>
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
          {/* <IconButton icon="arrow-left-drop-circle-outline" size={40} /> */}
          <Text style={styles.headerTitle}>创建账号</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput style={styles.input} label="用户名" />
          <TextInput
            style={styles.input}
            label="密码"
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
          />
          <TextInput
            style={styles.input}
            label="确认密码"
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.inputButton}
              icon="login"
              mode="contained"
              labelStyle={{
                color: 'white',
              }}>
              注册
            </Button>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>© 2021</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  headerBg: {
    height: 256,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    resizeMode: 'stretch',
    top: 0,
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
  formContainer: {
    marginTop: 56,
  },
  input: {
    marginBottom: 24,
  },
  inputButton: {
    borderRadius: 999,
    width: 88,
    elevation: 0
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
