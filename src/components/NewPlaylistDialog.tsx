import React, { useState } from 'react';
import { Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { Text } from 'react-native';

interface Props {
  visible: boolean;
  hideDialog: () => unknown;
}

const NewPlaylistDialog = ({ visible, hideDialog }: Props) => {
  const [input, setInput] = useState('');
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text
            style={{
              marginBottom: 16,
            }}>
            新建播放列表
          </Text>
          <TextInput
            value={input}
            onChangeText={text => setInput(text)}
            mode="flat"
            placeholder="播放列表名称..."
            dense={true}
            style={{
              backgroundColor: 'transparent',
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              取消
            </Text>
          </Button>
          <Button
            disabled={input.trim().length <= 0}
            onPress={() => console.log('Cancel')}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              创建
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default NewPlaylistDialog;
