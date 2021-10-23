import React from 'react';
import { Text, View, Image } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import { RippleOverlay } from '../components/RippleOverlay';
//@ts-expect-error
import bar from '../assets/bar.png';
import { usePlayer } from '../player/hooks';
import { useWebfxRef } from '../utils/webfxForReact';
import { formatTime } from '../utils/webfx';
import { useLoudnessMap } from '../api';

const PlayingScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FF6557' }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}>
        <Picture />
        <Control />
      </View>
    </View>
  );
};

const Picture = () => {
  const track = useWebfxRef(usePlayer().track);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{ elevation: 16, backgroundColor: '#FFFFFF', borderRadius: 16 }}>
        <Image
          style={{ width: '70%', aspectRatio: 1, borderRadius: 16 }}
          source={{
            uri: track?.picurl,
          }}
        />
      </View>
    </View>
  );
};

const Control = () => {
  const player = usePlayer();
  const track = useWebfxRef(player.track, 'control_track');
  const playing = useWebfxRef(player.isPlaying);
  console.info('playing', track?.id);
  return (
    <View
      style={{
        flex: 0.8,
        alignSelf: 'center',
        width: '70%',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ display: 'flex', width: '80%' }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 22, fontWeight: '700', marginBottom: 4 }}>
            {track?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: 'rgba(0,0,0,0.24)',
            }}>
            {track?.artist}
          </Text>
        </View>
        <MiIcon name="favorite-border" size={32} />
      </View>
      <View style={{ width: '100%' }}>
        <ProgressBar />
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <PositionText />
          <Text style={{ fontSize: 14 }}>{formatTime(track?.length)}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.3,
          alignSelf: 'center',
          width: '130%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <IconButton icon="cached" size={32} onPress={() => {}} />
        <IconButton
          icon="skip-previous"
          size={32}
          onPress={() => {
            player.prev();
          }}
        />
        <View
          style={{
            backgroundColor: '#FF6557',
            width: 64,
            height: 64,
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Icon name={playing ? 'pause' : 'play'} size={32} color="#FFFFFF" />
          <RippleOverlay
            onPress={() => {
              playing ? player.pause() : player.play();
            }}
          />
        </View>
        <IconButton
          icon="skip-next"
          size={32}
          onPress={() => {
            player.next();
          }}
        />
        <IconButton icon="cached" size={32} onPress={() => {}} />
      </View>
    </View>
  );
};

const PositionText = () => {
  const position = useWebfxRef(usePlayer().position);
  return <Text style={{ fontSize: 14 }}>{formatTime(position)}</Text>;
};

const ProgressBar = () => {
  const track = useWebfxRef(usePlayer().track);
  const theme = useTheme();
  if (track) {
    const loudnessMap = useLoudnessMap(track.id, 10);
    console.log(loudnessMap);
  }
  // return (
  //   <Image
  //     source={bar}
  //     resizeMode="contain"
  //     style={{ width: '100%', height: 48 }}
  //   />
  // );
  return (
    <View style={{
      width: '100%',
      height: 48,
      flexDirection: 'row'
    }}>
      {new Array(28).map(_ => (
        <View
          style={{
            height: 8,
            width: 8,
            backgroundColor: theme.colors.primary,
          }}></View>
      ))}
    </View>
  );
};

export default PlayingScreen;
