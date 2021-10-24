import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import layout from '../styles/layout';
import {
  List,
  useTheme,
  Portal,
  Modal,
  RadioButton,
  Text,
  Title,
} from 'react-native-paper';
import { useI18n } from '../i18n/hooks';
import { useApp } from '../hooks/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const theme = useTheme();
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const themeColors = [
    '#ff6557',
    '#607d8b',
    '#ff9800',
    '#ffeb3b',
    '#4caf50',
    '#00bcd4',
    '#2196f3',
    '#9575cd',
    '#f06292',
    '#29b6f6',
  ];

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
          style={{
            alignItems: 'center',
            borderRadius: 16,
          }}
          visible={colorModal.visible}
          onDismiss={colorModal.hideModal}
          contentContainerStyle={containerStyle}>
          <View>
            <Text
              style={{
                marginBottom: 16,
              }}>
              选择主题色
            </Text>
            <View style={styles.colorRow}>
              {themeColors.slice(0, 5).map((color, index) => (
                <ColorPattern key={color} color={color} themeColor={theme.colors.primary} />
              ))}
            </View>
            <View style={styles.colorRow}>
              {themeColors.slice(5, 10).map((color, index) => (
                <ColorPattern key={color} color={color} themeColor={theme.colors.primary} />
              ))}
            </View>
          </View>
        </Modal>
        <Modal
          visible={languageModal.visible}
          onDismiss={languageModal.hideModal}
          contentContainerStyle={containerStyle}>
          <View>
            <RadioButton.Group
              onValueChange={newValue => app.i18n.setLanguage(newValue)}
              value={lang}>
              {app.i18n.languages.map(lang => (
                <RadioButton.Item
                  color={theme.colors.primary}
                  key={lang}
                  label={
                    app.i18n.core.get2('简体中文（中国）', undefined, lang)!
                  }
                  value={lang}
                />
              ))}
            </RadioButton.Group>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

interface ColorPatternProps {
  color: string;
  themeColor: string;
}

const ColorPattern = (props: ColorPatternProps) => {
  const app = useApp();
  return (
    <Pressable
      onPress={() => {
        app.themeRef.value = props.color;
        app.save();
      }}
    >
      <View 
        style={{
          width: 48,
          height: 48,
          backgroundColor: props.color,
          borderRadius: 99999,
          marginRight: 12,
        }}>
        {props.color === props.themeColor ? (
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              left: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 99999,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="check" size={16} color="white" />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

function useModalState() {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return { visible, setVisible, showModal, hideModal };
}

const styles = StyleSheet.create({
  colorRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
});

export default SettingsScreen;
