import React from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BigItem } from '../../components/BigItem';
import { ColumnsLayout } from '../../layouts/ColumnsLayout';
import { RippleOverlay } from '../../components/RippleOverlay';
import styles from './HomeScreen.styles';
import { useUserInfo, useRecentPlays, Api } from '../../api';
import useScreenAnimation from '../../hooks/useScreenAnimation';
import layout from '../../styles/layout';
import { ScreenProps } from '../../utils/screen';
import TrackItem from '../../components/TrackItem';
import { usePlayer } from '../../player/hooks';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useI18n } from '../../i18n/hooks';

const testpic =
  'https://mc.yuuza.net/api/storage/pic/223202bf-bc43-4eea-b81b-59394b84ef82.jpg';

const HomeScreen = (props: ScreenProps) => {
  const { value: userinfo } = useUserInfo();
  const screenAnimation = useScreenAnimation();
  const I = useI18n();

  return (
    <Animated.ScrollView
      onScroll={props.screenState.getOnScroll()}
      style={{
        ...layout.container,
        ...screenAnimation,
      }}>
      <View style={{ backgroundColor: '#F4F4F4', flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 16,
          }}>
          Hello, {userinfo.username}.
        </Text>
        <RecentPlaylists />
        <Text
          style={{
            fontSize: 16,
            color: '#FF6557',
            fontWeight: '700',
            marginVertical: 16,
          }}>
          {I`最近播放`}
        </Text>
        <RecentTracks />
        <View style={{ height: 112 }}></View>
      </View>
    </Animated.ScrollView>
  );
};

const RecentPlaylists = () => {
  const I = useI18n();
  return (
    <ColumnsLayout columns={2}>
      <PlaylistButton bg={testpic} icon="history" text={I`最近播放`} />
      <PlaylistButton bg={testpic} text={I`播放列表1`} />
      <PlaylistButton bg={testpic} icon="cloud" text={I`音乐库`} />
    </ColumnsLayout>
  );
};

const PlaylistButton = (props: { bg: any; icon?: string; text: string }) => (
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

const RecentTracks = React.memo(() => {
  let { value: tracks } = useRecentPlays();
  tracks = tracks?.slice(0, 20) ?? [];
  const player = usePlayer();
  const theme = useTheme();
  const playTrack = (item: Api.Track) => {
    player.playTrack(item);
  };
  return tracks.length > 0 ? (
    <View>
      {tracks?.map((t, i) => (
        <TrackItem key={i} track={t} onPress={playTrack} />
      ))}
    </View>
  ) : (
    <ActivityIndicator
      style={{
        marginTop: 36
      }}
      animating={true}
      color={theme.colors.primary}
    />
  );
});

export default HomeScreen;
