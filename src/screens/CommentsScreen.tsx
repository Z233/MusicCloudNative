import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import { useI18n } from '../i18n/hooks';
import { IconButton, useTheme, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Api } from '../api/apidef';
import { useFavouriteState } from '../api/hooks';
import MiIcon from 'react-native-vector-icons/MaterialIcons';

const CommentsScreen = () => {
  const I = useI18n();
  const theme = useTheme();
  const {
    params: { track },
  } = useRoute() as { params: { track: Api.Track } };
  const navigation = useNavigation();
  const [fav, setFav] = useFavouriteState(track);
  return (
    <>
      <View style={styles.headerContainer}>
        <StatusBar backgroundColor="transparent" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton
            icon="chevron-left"
            size={32}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 16,
            }}>{I`评论（0）`}</Text>
        </View>
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
            <MiIcon
              name={fav ? 'favorite' : 'favorite-border'}
              color={fav ? theme.colors.primary : 'black'}
              size={24}
              onPress={() => setFav(!fav)}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 16,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 16,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
          <TextInput placeholder={I`输入评论内容...`} />
          <Button mode="text" onPress={() => {}}>{I`发送`}</Button>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 40,
                aspectRatio: 1,
                borderRadius: 999,
                marginRight: 8,
              }}
              source={{
                uri: 'https://avatars.githubusercontent.com/u/7451883?v=4',
              }}
            />
            <View>
              <Text>Fronz</Text>
              <Text
                style={{
                  color: '#7A7A7A',
                  fontSize: 12,
                }}>
                2019 年 03 月 18 日
              </Text>
            </View>
          </View>
          <Text  style={{
            paddingLeft: 48,
            marginTop: 8,
            lineHeight: 24
          }}>
            滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
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
    paddingRight: 16,
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
});

export default CommentsScreen;
