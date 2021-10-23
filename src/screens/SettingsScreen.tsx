import React from 'react';
import { View } from 'react-native';
import layout from '../styles/layout';
import { List, useTheme, Portal, Modal, RadioButton, Text } from 'react-native-paper';
import { useI18n } from '../i18n/hooks';
import { useApp } from '../hooks/AppContext';

const SettingsScreen = () => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const app = useApp();
  const lang = app.i18n.curlang.useValue();
  const I = useI18n();
  return (
    <>
      <View style={layout.container}>
        <View>
          <Text>{I`切换语言`}</Text>
          <RadioButton.Group onValueChange={newValue => app.i18n.setLanguage(newValue)} value={lang}>
            <RadioButton.Item label="中文（中国）" value="zh-cn" />
            <RadioButton.Item label="English (United States)" value="en-us" />
          </RadioButton.Group>
        </View>
        <List.Item
          title="主题色"
          onPress={() => showModal()}
          right={() => (
            <View
              style={{
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 24,
                  width: 24,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 999,
                }}
              />
            </View>
          )}
        />
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          
        </Modal>
      </Portal>
    </>
  );
};

export default SettingsScreen;
