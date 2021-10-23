import React, { useEffect } from 'react';
import { Text, View, Image, StyleProp, ViewStyle } from 'react-native';
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { State } from '../player';

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
  const POINTS_NUM = 28;
  const player = usePlayer();
  const track = useWebfxRef(player.track);
  const posRate = useWebfxRef(player.positionRatio);
  const theme = useTheme();
  const loudnessArr = useLoudnessMap(track?.id ?? 0, POINTS_NUM);

  const progressWidth = useSharedValue(
    player.state.value === State.Playing ? posRate * 100 + '%' : '0%',
  );
  const progressStyles = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
      opacity: 1,
      position: 'absolute',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      alignItems: 'center',
    };
  });

  useEffect(() => {
    progressWidth.value = posRate * 100 + '%'
  }, [posRate]);

  interface BarProps {
    width: string;
    opacity: number;
    animatedStyles?: Animated.AnimateStyle<ViewStyle>;
  }

  const Bar = ({ width, opacity, animatedStyles }: BarProps) => {
    return (
      <Animated.View
        style={[
          {
            width,
            opacity,
            position: 'absolute',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            alignItems: 'center',
          },
          animatedStyles,
        ]}>
        {new Array(POINTS_NUM).fill(null).map((_, i) => (
          <View
            key={i}
            style={{
              height: (loudnessArr?.[i] ?? 0) * 36 + 12,
              width: 6,
              borderRadius: 3,
              backgroundColor: theme.colors.primary,
              marginLeft: i === 0 ? 0 : 4.4,
            }}
          />
        ))}
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: 56,
        position: 'relative',
      }}>
      <Bar width="100%" opacity={0.3} />
      <Animated.View style={[progressStyles]}>
        {new Array(POINTS_NUM).fill(null).map((_, i) => (
          <View
            key={i}
            style={{
              height: (loudnessArr?.[i] ?? 0) * 36 + 12,
              width: 6,
              borderRadius: 3,
              backgroundColor: theme.colors.primary,
              marginLeft: i === 0 ? 0 : 4.4,
            }}
          />
        ))}
        <View style={{
          width: 4,
          height: 56,
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          right: 0,
          borderRadius: 9999
        }} />
      </Animated.View>
    </View>
  );
};

export default PlayingScreen;
