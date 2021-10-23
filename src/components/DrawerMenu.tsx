import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Drawer, TouchableRipple } from 'react-native-paper';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useI18n } from '../i18n/hooks';

interface DrawerItemProps {
  label: string;
  onPress?: () => void;
}

const DrawerItem = (props: DrawerItemProps) => {
  return (
    <TouchableRipple
      style={{
        borderRadius: 8,
      }}
      onPress={props.onPress}
      borderless={true}
      rippleColor="rgba(0, 0, 0, .2)">
      <View
        style={{
          padding: 12,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 16,
          }}>
          {props.label}
        </Text>
      </View>
    </TouchableRipple>
  );
};

const DrawerMenu = () => {
  const [active, setActive] = React.useState('');
  const navigation = useNavigation();
  const I = useI18n();

  const navigateTo = (name: string) =>
    navigation.dispatch(
      CommonActions.navigate({
        name,
      }),
    );

  return (
    <Drawer.Section
      style={{
        paddingTop: StatusBar.currentHeight,
        borderWidth: 0,
        flex: 1,
      }}>
      <Text
        style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        MusicCloud
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              padding: 8,
            }}>
            <DrawerItem label={I`设置`} onPress={() => navigateTo("Settings")} />
            <DrawerItem label={I`关于`} onPress={() => navigateTo("About")} />
          </View>
        </View>
      </View>
    </Drawer.Section>
  );
};

export default DrawerMenu;
