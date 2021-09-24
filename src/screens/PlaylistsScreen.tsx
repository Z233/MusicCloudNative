import React from 'react';
import { Text, View } from 'react-native';
import MyAppbar from '../components/MyAppbar';

const PlaylistsScreen = () => (
  <View style={{ flex: 1 }}>
    <View
      style={{
        backgroundColor: '#F4F4F4',
        padding: 16,
        paddingVertical: 24,
        flex: 1,
      }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Playlists WIP.</Text>
    </View>
  </View>
);

export default PlaylistsScreen;
