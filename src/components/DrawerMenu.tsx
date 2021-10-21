import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Drawer } from 'react-native-paper';

const DrawerMenu = () => {
  const [active, setActive] = React.useState('');
  return (
    <Drawer.Section
      title="Music Cloud"
      style={{
        paddingTop: StatusBar.currentHeight,
        borderWidth: 0,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between'
        }}>
        <View>
          <Drawer.Item
            label="设置"
            active={active === 'first'}
            onPress={() => setActive('first')}
          />
          <Drawer.Item
            label="关于"
            active={active === 'second'}
            onPress={() => setActive('second')}
          />
        </View>
      </View>
    </Drawer.Section>
  );
};

export default DrawerMenu;
