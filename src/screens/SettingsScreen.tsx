import React from 'react';
import { View } from 'react-native';
import layout from '../styles/layout';
import { List, useTheme, Portal, Modal, RadioButton, Text } from 'react-native-paper';
import { useI18n } from '../i18n/hooks';
import { useApp } from '../hooks/AppContext';

const SettingsScreen = () => {
  const theme = useTheme();
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const colorModal = useModalState();
  const languageModal = useModalState();

  const app = useApp();
  const lang = app.i18n.curlang.useValue();
  const I = useI18n();
  return (
    <>
      <View style={layout.container}>
        <List.Item
          title={I`主题色`}
          onPress={() => colorModal.showModal()}
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
        <List.Item
          title={I`切换语言`}
          onPress={() => languageModal.showModal()}
          right={() => (
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text>{I`简体中文（中国）`}</Text>
            </View>
          )}
        />
      </View>
      <Portal>
        <Modal
          visible={colorModal.visible}
          onDismiss={colorModal.hideModal}
          contentContainerStyle={containerStyle}>

        </Modal>
        <Modal
          visible={languageModal.visible}
          onDismiss={languageModal.hideModal}
          contentContainerStyle={containerStyle}>
          <View>
            <RadioButton.Group onValueChange={newValue => app.i18n.setLanguage(newValue)} value={lang}>
              {
                app.i18n.languages.map(lang => (
                  <RadioButton.Item key={lang} label={app.i18n.core.get2("简体中文（中国）", undefined, lang)!} value={lang} />
                ))
              }
            </RadioButton.Group>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

function useModalState() {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return { visible, setVisible, showModal, hideModal };
}

export default SettingsScreen;
