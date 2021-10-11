import React from "react";
import { Image, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { ProgressBar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { usePlayer } from "../player/hooks";
import { useWebfxRef } from "../utils/webfxForReact";
import { State } from "../player";

interface Props {
  onPress: Function
}


const PlayingBar = ({ onPress }: Props) => {
  const player = usePlayer();
  const track = useWebfxRef(player.track);
  const playing = useWebfxRef(player.isPlaying);
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress()}>
      <View
        style={styles.container}
      >
        <View style={styles.wrapper}>
          <View style={styles.trackContainer}>
            <Image style={styles.albumCover} source={{ uri: track?.thumburl }} />
            <View style={styles.trackInfo}>
              <Text numberOfLines={1} style={styles.trackTitle}>{track?.name}</Text>
              <Text numberOfLines={1} style={styles.trackArtist}>{track?.artist}</Text>
            </View>
          </View>
          <View style={styles.operationContainer}>
            <Icon name={playing ? "pause" : "play-arrow"} size={32} onPress={() => {
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
  )
}

const Progress = () => {
  const theme = useTheme()
  const player = usePlayer();
  return (
    <ProgressBar
      style={styles.progress}
      color={theme.colors.primary}
      progress={useWebfxRef(player.positionRatio)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 72,
    paddingHorizontal: 16
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16
  },
  albumCover: {
    height: 40,
    width: 40,
    borderRadius: 8,
    marginRight: 16
  },
  trackContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  trackInfo: {

  },
  trackTitle: {
    fontWeight: "bold"
  },
  trackArtist: {
    color: 'rgba(0, 0, 0, 0.24)'
  },
  operationContainer: {
  },
  progressWrapper: {
    paddingHorizontal: 16,
    marginHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progress: {
    borderRadius: 4
  }
})

export default PlayingBar