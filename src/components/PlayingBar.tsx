import React, { useMemo, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePlayer } from '../player/hooks';
import { useWebfxRef } from '../utils/webfxForReact';
import { State } from '../player';

interface Props {
  onPress: Function;
}

const PlayingBar = ({ onPress }: Props) => {
  const player = usePlayer();
  const track = useWebfxRef(player.track);
  const playing = useWebfxRef(player.isPlaying);

  const bottom = useMemo(() => new Animated.Value(track ? 72 : -72), []);
  const opacity = useMemo(() => new Animated.Value(track ? 1 : 0), []);
  useEffect(() => {
    Animated.timing(bottom, {
      toValue: track ? 72 : -72,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.bezier(0.17, 0.67, 0.59, 0.9),
    }).start();
    Animated.timing(opacity, {
      toValue: track ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.bezier(0.17, 0.67, 0.59, 0.9),
    }).start();
  }, [track]);

  return (
    <Animated.View style={{ ...styles.container, bottom, opacity }}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View
          style={{
            width: '100%',
          }}>
          <View style={styles.wrapper}>
            <View style={styles.trackContainer}>
              <Image
                style={styles.albumCover}
                source={{ uri: track?.thumburl }}
              />
              <View style={styles.trackInfo}>
                <Text numberOfLines={1} style={styles.trackTitle}>
                  {track?.name}
                </Text>
                <Text numberOfLines={1} style={styles.trackArtist}>
                  {track?.artist}
                </Text>
              </View>
            </View>
            <View style={styles.operationContainer}>
              <Icon
                name={playing ? 'pause' : 'play-arrow'}
                size={32}
                onPress={() => {
                  playing ? player.pause() : player.play();
                }}></Icon>
              {/* <IconButton icon="pause" size={20} /> */}
            </View>
          </View>
          <View style={styles.progressWrapper}>
            <Progress />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const Progress = () => {
  const theme = useTheme();
  const player = usePlayer();
  return (
    <ProgressBar
      style={styles.progress}
      color={theme.colors.primary}
      progress={useWebfxRef(player.positionRatio)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 16,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    overflow: 'hidden',
    width: '100%',
  },
  albumCover: {
    height: 48,
    width: 48,
    borderRadius: 8,
    marginRight: 16,
  },
  trackContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontWeight: 'bold',
    lineHeight: 20,
  },
  trackArtist: {
    color: 'rgba(0, 0, 0, 0.24)',
    lineHeight: 20,
  },
  operationContainer: {},
  progressWrapper: {
    paddingHorizontal: 0,
    marginHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progress: {
    borderRadius: 4,
  },
});

export default PlayingBar;
