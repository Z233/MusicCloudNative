import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Drawer } from 'react-native-paper';
import { useNavigation, CommonActions } from '@react-navigation/native';

const DrawerMenu = () => {
  const [active, setActive] = React.useState('');
  const navigation = useNavigation();

  const navigateTo = (name: string) =>
    navigation.dispatch(
      CommonActions.navigate({
        name,
      }),
    );

  return (
    <Drawer.Section
      title="MusicCloud"
      style={{
        paddingTop: StatusBar.currentHeight,
        borderWidth: 0,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Drawer.Item
            label="设置"
            active={active === 'setting'}
            onPress={() => navigateTo('设置')}
          />
          <Drawer.Item
            label="关于"
            active={active === 'about'}
            onPress={() => navigateTo('关于')}
          />
        </View>
      </View>
    </Drawer.Section>
  );
};

export default DrawerMenu;
