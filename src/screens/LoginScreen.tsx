import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import layout from '../styles/layout';
import { useClient } from '../api';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { useI18n } from '../i18n/hooks';

const LoginScreen = () => {
  const client = useClient();
  const navigation = useNavigation();
  const I = useI18n();

  const [username, setUsername] = useState('publicuser');
  const [passwd, setPasswd] = useState('public');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    await client.login(username, passwd);
    setLoading(false);
  };

  const onPressRegisterButton = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Register',
      }),
    );
  };
  return (
    <View style={layout.loginContainer}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          label={I`用户名`}
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          label={I`密码`}
          onChangeText={setPasswd}
          value={passwd}
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onPressRegisterButton}>{I`创建账号`}</Button>
          <Button
            style={styles.inputButton}
            icon="login"
            mode="contained"
            onPress={onLogin}
            loading={loading}
            labelStyle={{
              color: 'white',
            }}>
            {I`登录`}
          </Button>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>© 2021</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 56,
  },
  input: {
    marginBottom: 24,
  },
  inputButton: {
    borderRadius: 999,
    width: 88,
    elevation: 0,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
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

export default LoginScreen;
