import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BigItem } from '../components/BigItem';
import { Layout } from '../styles';
import PlaylistItem, { onPressPlaylistItem } from '../components/PlaylistItem'

interface Props {
  onPressPlaylist: onPressPlaylistItem
}

const PlaylistsScreen = ({ onPressPlaylist }: Props) => {
  return (
    <ScrollView style={Layout.container}>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <PlaylistButton icon="expand-all" text="最近添加" index={0} />
        <PlaylistButton icon="history" text="最近播放" index={1} />
      </View>
      <PlaylistsHeader />
      <View>
        <PlaylistItem
          onPress={onPressPlaylist}
          title="ACG"
          owner="Fronz"
          cover="https://mc-stor.yuuza.net/pic/467e08f4-6884-4461-9b98-a0176fed6f29.jpg"
        />
        <PlaylistItem
          onPress={onPressPlaylist}
          title="Cool Music"
          owner="Yuuza"
          cover="https://mc-stor.yuuza.net/pic/65d8a422-3c89-4aca-8e37-7d87f31203a6.jpg"
        />
      </View>
    </ScrollView>
  )
}

const PlaylistsHeader = () => (
  <View style={{ flexDirection: 'row', height: 28, justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
    <IconButton
      icon="plus"
      size={24}
      color="rgba(0,0,0,.46)"
      style={{ alignSelf: 'center', margin: 0 }}
      onPress={() => { }}
    />
    <View style={{ height: 28, flexDirection: 'row', alignItems: 'center' }}>
      <Text>创建时间</Text>
      <IconButton
        icon="sort"
        size={16}
        color="rgba(0,0,0,.46)"
        style={{ alignSelf: 'center', margin: 0 }}
        onPress={() => { }}
      />
    </View>
  </View>
)

const PlaylistButton = (props: { icon: string; text: string; index: number }) => (
  <View style={{
    width: '50%',
    paddingRight: props.index % 2 ? 0 : 4,
    paddingLeft: props.index % 2 ? 4 : 0,
  }}>
    <View
      style={{
        height: 56,
        borderRadius: 16,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={props.icon} size={24} color="#918C8C" />
      </View>
      <View
        style={{
          paddingLeft: 56,
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
        }}>
        <Text style={{ marginLeft: 8, fontSize: 14, color: 'black' }}>
          {props.text}
        </Text>
      </View>
      <TouchableRipple
        style={{ position: 'absolute', height: '100%', width: '100%' }}
        onPress={() => { }}
        rippleColor="rgba(0, 0, 0, .2)">
        <View />
      </TouchableRipple>
    </View>
  </View>
);

export default PlaylistsScreen;
