
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
        data={list.tracks}
        renderItem={({ item }) => {
          return <BigItem title={item.name} subtitle={item.artist} pic={item.picurl!} />;
        }}
        contentContainerStyle={{ paddingBottom: 180 }}
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
