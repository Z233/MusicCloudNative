import React from 'react';
import { View, Image, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { RippleOverlay } from './RippleOverlay';
import TouchableCustom from './TouchableCustom';

interface Props {
  title: string;
  subtitle: string;
  pic?: string;
  onPress?: () => void;
  onPressMore?: () => void;
}

export const BigItem = React.memo((props: Props) => (
  <View>
    <TouchableCustom onPress={props.onPress ?? (() => {})}>
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 8,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{
              height: 68,
              width: 68,
              borderRadius: 16,
              backgroundColor: '#DDDDDD',
            }}
            source={{ uri: props.pic }}
          />
          <View style={{ marginLeft: 24, flex: 1 }}>
            <Text
              style={{ fontSize: 16, marginTop: 8 }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {props.title}
            </Text>
            <Text
              style={{ fontSize: 16, marginTop: 8, color: 'rgba(0,0,0,.24)' }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {props.subtitle}
            </Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
      </View>
    </TouchableCustom>
    <IconButton
      icon="dots-vertical"
      size={24}
      color="rgba(0,0,0,.46)"
      style={{
        alignSelf: 'center',
        margin: 0,
        position: 'absolute',
        right: 0,
        top: 12
      }}
      onPress={props.onPressMore}
    />
  </View>
));
