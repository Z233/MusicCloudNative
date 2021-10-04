import React, { Children } from 'react';
import { Image, ScrollView, Text, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BigItem } from '../../components/BigItem';
import { ColumnsLayout } from '../../layouts/ColumnsLayout';
import { RippleOverlay } from '../../components/RippleOverlay';
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
      <View style={{ height: 180 }}></View>
    </View>
  </ScrollView>
);

const RecentPlaylists = () => {
  return (
    <ColumnsLayout columns={2}>
      <PlaylistButton bg={testpic} icon="history" text="最近播放" />
      <PlaylistButton bg={testpic} text="播放列表1" />
      <PlaylistButton bg={testpic} icon="cloud" text="音乐库" />
    </ColumnsLayout>
  );
};

const PlaylistButton = (props: { bg: any; icon?: string; text: string; }) => (
  <View
    style={{
      height: 48,
      borderRadius: 8,
      backgroundColor: 'white',
      overflow: 'hidden',
      marginBottom: 8,
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
    <RippleOverlay onPress={() => {}} />
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
    {testRecentTracks}
    {/* <BigItem
      title="動く、動く"
      subtitle="水瀬いのり / 久保ユリカ"
      pic={testpic}
    />
    <BigItem title="Sincerely" subtitle="TRUE" pic={testpic} /> */}
  </View>
);

export default HomeScreen;
