import { useRoute } from '@react-navigation/core';
import React from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { usePlayList } from '../api';
import { BigItem } from '../components/BigItem';
import { formatTimeLong, getTracksTotalLength } from '../utils/util';

const PlaylistDetailScreen = React.memo(() => {
  const { params } = useRoute() as { params: { id: number } };
  const theme = useTheme();
  const list = usePlayList(params.id);
  const keyMap = {} as any;
  const tracks = list.tracks?.map(track => {
    const keysurfix = (keyMap[track.id] = (keyMap[track.id] || 0) + 1);
    return { ...track, key: track.id + '_' + keysurfix };
  });
  console.info('list', list.id, tracks?.length);
  const timeString = formatTimeLong(getTracksTotalLength(tracks));

  return (
    <FlatList
      data={tracks}
      ListHeaderComponent={
        <>
          <View
            style={{
              ...styles.listHeaderContainer,
              backgroundColor: theme.colors.primary,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ width: 112, height: 112, borderRadius: 16 }}
                source={{ uri: list.picurl }}
              />
              <View style={{ marginLeft: 24 }}>
                <Text style={styles.title}>{list.name}</Text>
                <Text style={styles.subtitle}>
                  {list.state == 'loading'
                    ? '加载中……'
                    : `${tracks?.length} 首，${timeString}`}
                </Text>
                <Text style={styles.subtitle}>{list.ownerName}</Text>
              </View>
            </View>
            <View style={styles.operationContainer}>
              <IconButton
                style={styles.operationButton}
                icon="heart-outline"
                color="white"
              />
              <IconButton
                style={styles.operationButton}
                icon="download-circle-outline"
                color="white"
              />
              <IconButton
                style={styles.operationButton}
                icon="dots-vertical"
                color="white"
              />
            </View>
            <IconButton
              color="white"
              icon="play-circle"
              size={64}
              style={styles.playButton}
            />
          </View>
          <View style={styles.itemsHeader}>
            <View
              style={{
                height: 28,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>最近添加</Text>
              <IconButton
                icon="sort"
                size={16}
                color="rgba(0,0,0,.46)"
                style={{ alignSelf: 'center', margin: 0 }}
                onPress={() => {}}
              />
            </View>
          </View>
        </>
      }
      renderItem={({ item }) => {
        return (
          <BigItem
            key={item.key}
            title={item.name}
            subtitle={item.artist}
            pic={item.picurl!}
          />
        );
      }}
      contentContainerStyle={styles.contentBox}
    />
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
    paddingBottom: 96,
    paddingHorizontal: 16,
  },
  listHeaderContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    width: Dimensions.get('screen').width,
    right: 16,
    marginBottom: 16,
  },
  playButton: {
    position: 'absolute',
    right: 0,
    bottom: -16,
  },
  operationContainer: {
    flexDirection: 'row',
    marginLeft: -8,
  },
  operationButton: {
    marginRight: -4,
  },
  itemsHeader: {
    flexDirection: 'row-reverse',
  },
});

export default PlaylistDetailScreen;
