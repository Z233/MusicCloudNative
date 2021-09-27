import React from "react";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import { Colors, IconButton, ProgressBar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const testpic =
  'https://mc.yuuza.net/api/storage/pic/223202bf-bc43-4eea-b81b-59394b84ef82.jpg';

const PlayingBar = () => {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.trackContainer}>
          <Image style={styles.albumCover} source={{ uri: testpic }} />
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>Sincerely</Text>
            <Text style={styles.trackArtist}>TRUE</Text>
          </View>
        </View>
        <View style={styles.operationContainer}>
          <Icon name="pause" size={32}></Icon>
          {/* <IconButton icon="pause" size={20} /> */}
        </View>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar 
          style={styles.progress}
          color={theme.colors.primary}
          progress={0.5}
        />
      </View>
    </View>
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