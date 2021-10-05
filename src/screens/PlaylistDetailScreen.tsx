
import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { Image, StatusBar, Text, View, ScrollView, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { usePlayList } from '../api';
import { BigItem } from '../components/BigItem';

const PlaylistDetailScreen = () => {
  const { params } = useRoute() as { params: { id: number } }
  const theme = useTheme();
  const list = usePlayList(params.id);
  const keyMap = {} as any;
  const tracks = list.tracks?.map(track => {
    const keysurfix = keyMap[track.id] = (keyMap[track.id] || 0) + 1;
    return { ...track, key: track.id + '_' + keysurfix };
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: theme.colors.primary, padding: 24 }}>
        <Image style={{ width: 112, height: 112, borderRadius: 16 }}
          source={{ uri: list.picurl }} />
        <Text>{list.id}</Text>
        <Text>{list.name}</Text>
        <Text>{list.ownerName}</Text>
      </View>
      <FlatList
        data={tracks}
        renderItem={({ item }) => {
          return <BigItem key={item.key} title={item.name} subtitle={item.artist} pic={item.picurl!} />;
        }}
        contentContainerStyle={{
          backgroundColor: '#F4F4F4',
          padding: 16,
          paddingVertical: 24,
          paddingBottom: 180,
        }}
      />
    </View>
  );
};

const FakeStatusBar = () => (
  <>
    <StatusBar barStyle="light-content" />
    <View style={{ height: StatusBar.currentHeight }}></View>
  </>
);

export default PlaylistDetailScreen;
