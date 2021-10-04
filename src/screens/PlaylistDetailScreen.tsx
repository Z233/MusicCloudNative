
import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface Props {

}

const PlaylistDetailScreen = () => {
  const { params } = useRoute() as { params: { title: string, owner: string, cover: string } }
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: theme.colors.primary, padding: 24 }}>
        <Image style={{ width: 112, height: 112, borderRadius: 16 }}
          source={{ uri: params.cover }} />
        <Text>{params.title}</Text>
        <Text>{params.owner}</Text>
        <Text>{params.cover}</Text>
      </View>
      <View
        style={{
          backgroundColor: '#F4F4F4',
          padding: 16,
          paddingVertical: 24,
          flex: 1,
        }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>PlaylistScreen WIP.</Text>
      </View>
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
