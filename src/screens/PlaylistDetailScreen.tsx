
import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  
}

const PlaylistDetailScreen = () => {
  const { params } = useRoute() as { params: { title: string, owner: string, cover: string } }
  
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#F4F4F4',
          padding: 16,
          paddingVertical: 24,
          flex: 1,
        }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>PlaylistScreen WIP.</Text>
        <Text>{params.title}</Text>
        <Text>{params.owner}</Text>
        <Text>{params.cover}</Text>
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
