import React from 'react';
import { View, Text } from 'react-native';
import layout from '../styles/layout';
import { List, useTheme, Portal, Modal } from 'react-native-paper';

const SettingsScreen = () => {
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  return (
    <>
      <View style={layout.container}>
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
