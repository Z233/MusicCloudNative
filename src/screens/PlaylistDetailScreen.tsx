
import { useRoute } from '@react-navigation/core';
import React from 'react';
import { Image, StatusBar, Text, View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { usePlayList } from '../api';
import { BigItem } from '../components/BigItem';
import { arraySum } from '../utils/webfx';

const PlaylistDetailScreen = React.memo(() => {
  const { params } = useRoute() as { params: { id: number } }
  const theme = useTheme();
  const list = usePlayList(params.id);
  const keyMap = {} as any;
  const tracks = list.tracks?.map(track => {
    const keysurfix = keyMap[track.id] = (keyMap[track.id] || 0) + 1;
    return { ...track, key: track.id + '_' + keysurfix };
  });
  console.info('list', list.id, tracks?.length);
  const minutes = !tracks ? 0 : Math.round(arraySum(tracks, x => x.length) / 60);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: theme.colors.primary, padding: 24 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{ width: 112, height: 112, borderRadius: 16 }}
            source={{ uri: list.picurl }} />
          <View style={{ marginLeft: 24 }}>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.subtitle}>{list.state == 'loading' ? "加载中……" : (`${tracks?.length} 首，${minutes} 分钟`)}</Text>
            <Text style={styles.subtitle}>{list.ownerName}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={tracks}
        renderItem={({ item }) => {
          return <BigItem key={item.key} title={item.name} subtitle={item.artist} pic={item.picurl!} />;
        }}
        contentContainerStyle={styles.contentBox}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  contentBox: {
    backgroundColor: '#F4F4F4',
    padding: 16,
    paddingVertical: 24,
    paddingBottom: 180,
  }
})


export default PlaylistDetailScreen;
