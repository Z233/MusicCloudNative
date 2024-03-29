import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import layout from '../styles/layout';
import { useI18n } from '../i18n/hooks';
import { useClient } from '../api';

const RegisterScreen = () => {
  const I = useI18n();
  const client = useClient();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  return (
    <React.Fragment>
      <View style={layout.loginContainer}>
        <View style={styles.formContainer}>
          <TextInput value={username} onChangeText={setUsername} style={styles.input} label={I`用户名`} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            label={I`密码`}
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
          />
          <TextInput
            style={styles.input}
            label={I`确认密码`}
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
              }}
              loading={loading}
              onPress={async () => {
                setLoading(true)
                await client.register(username, password);
                setLoading(false)
              }}
              >
              {I`注册`}
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
