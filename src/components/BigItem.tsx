import React from "react";
import { View, Image, Text } from "react-native";
import { TouchableRipple, IconButton } from "react-native-paper";


export const BigItem = (props: { title: string; subtitle: string; pic: string; }) => (
  <View
    style={{
      borderRadius: 16,
      overflow: 'hidden',
    }}>
    <View style={{ flexDirection: 'row' }}>
      <Image
        style={{ height: 68, width: 68, borderRadius: 16 }}
        source={{ uri: props.pic }}
      />
      <View style={{ marginLeft: 24, flex: 1 }}>
        <Text style={{ fontSize: 16, marginTop: 8 }}>{props.title}</Text>
        <Text
          style={{ fontSize: 16, marginTop: 8, color: 'rgba(0,0,0,.24)' }}>
          {props.subtitle}
        </Text>
      </View>
      <IconButton
        icon="dots-vertical"
        size={24}
        color="rgba(0,0,0,.46)"
        style={{ alignSelf: 'center', margin: 0 }}
        onPress={() => { }}
      />
    </View>
  </View>
);
