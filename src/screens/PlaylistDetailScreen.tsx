
import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { Image, StatusBar, Text, View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { usePlayList } from '../api';
import { BigItem } from '../components/BigItem';

interface Props {

}

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
      <ScrollView>
        <View
          style={{
            backgroundColor: '#F4F4F4',
            padding: 16,
            paddingVertical: 24,
            flex: 1,
          }}>
          {
            list.tracks?.map(track => {
              const keysurfix = keyMap[track.id] = (keyMap[track.id] || 0) + 1;
              return <BigItem key={track.id + '_' + keysurfix} title={track.name} subtitle={track.artist} pic={track.picurl!} />
            })
          }
        </View>
        <View style={{ height: 180 }}></View>
      </ScrollView>
    </View>
  )
}

const FakeStatusBar = () => (
  <>
    <StatusBar barStyle="light-content" />
    <View style={{ height: StatusBar.currentHeight }}></View>
  </>
)

export default PlaylistDetailScreen;
