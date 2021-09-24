import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './HomeScreen.styles'

const testpic =
  'https://mc.yuuza.net/api/storage/pic/223202bf-bc43-4eea-b81b-59394b84ef82.jpg';

const HomeScreen = () => (
  <ScrollView style={styles.container}>
    <View style={{ backgroundColor: '#F4F4F4', flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 16
        }}>
        Hello Fronz.
      </Text>
      <RecentPlaylists />
      <Text
        style={{
          fontSize: 16,
          color: '#FF6557',
          fontWeight: '700',
          marginVertical: 16
        }}>
        最近播放
      </Text>
      <RecentTracks />
    </View>
  </ScrollView>
);

const RecentPlaylists = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
      }}>
      {/* <PlaylistButton bg={testpic} icon="history" text="最近播放" /> */}
      {Array(3).fill(null).map((_, index) => (
        <PlaylistButton bg={testpic} text="播放列表1" index={index} />
      ))}
      {/* <PlaylistButton bg={testpic} icon="cloud" text="音乐库" /> */}
    </View>
  );
};

const PlaylistButton = (props: { bg: any; icon?: string; text: string; index: number }) => (
  <View style={{ width: '50%',
                 paddingRight: props.index % 2 ? 0 : 4,
                 paddingLeft: props.index % 2 ? 4 : 0,
                 marginBottom: 8
              }}>
    <View
      style={{
        height: 48,
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}>
      <Image
        style={{ width: 48, height: 48, position: 'absolute' }}
        source={{ uri: props.bg }}
      />
      {props.icon ? (
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={props.icon} size={24} color="white" />
        </View>
      ) : null}
      <View
        style={{
          paddingLeft: 48,
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
        onPress={() => {}}
        rippleColor="rgba(0, 0, 0, .2)">
        <View />
      </TouchableRipple>
    </View>
  </View>
);

const BigItem = (props: { title: string; subtitle: string; pic: string }) => (
  <View
    style={{
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 8
    }}>
    <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .2)">
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
          onPress={() => {}}
        />
      </View>
    </TouchableRipple>
  </View>
);

const testRecentTracks = Array(10)
  .fill(null)
  .map((_, i) => (
    <BigItem
      key={i}
      title="動く、動く"
      subtitle="水瀬いのり / 久保ユリカ"
      pic={testpic}
    />
  ));

const RecentTracks = () => (
  <View>
    <BigItem
      title="動く、動く"
      subtitle="水瀬いのり / 久保ユリカ"
      pic={testpic}
    />
    <BigItem title="Sincerely" subtitle="TRUE" pic={testpic} />
  </View>
);

export default HomeScreen;
