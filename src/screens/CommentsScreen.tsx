import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useI18n } from '../i18n/hooks';
import { IconButton, useTheme, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Api } from '../api/apidef';
import { useFavouriteState, useComments, commentPaths } from '../api/hooks';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import { useApp } from '../hooks/AppContext';

const CommentsScreen = () => {
  const I = useI18n();
  const theme = useTheme();
  const {
    params: { track },
  } = useRoute() as { params: { track: Api.Track } };
  const navigation = useNavigation();
  const [fav, setFav] = useFavouriteState(track);
  const { comments, postComment } = useComments(commentPaths.track(track.id));
  const commentCount = comments.comments?.length ?? 0;
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
      <FlatList
        data={comments.comments}
        ListHeaderComponent={
          <CommentPoster postComment={postComment} />
        }
        renderItem={({ item }) => <CommentView key={item.id} comment={item} />}
        contentContainerStyle={{
          paddingBottom: 96
        }}
      />
    </>
  );
};

function CommentPoster(props: { postComment: (content: string) => Promise<void> }) {
  const I = useI18n();
  const [input, setInput] = useState('');
  const [posting, setPosting] = useState(false);
  return (
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
          // justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
        <TextInput style={{ flex: 1 }} onChangeText={setInput} value={input} placeholder={I`输入评论内容...`} />
        <Button
          mode="text"
          loading={posting}
          disabled={!input}
          onPress={async () => {
            if (input) {
              setPosting(true);
              await props.postComment(input);
              setInput('');
              setPosting(false);
            }
          }}>{I`发送`}</Button>
      </View>
    </View>
  )
}

function CommentView({ comment }: { comment: Api.Comment }) {
  const app = useApp();
  return (
    <View style={{ margin: 16 }}>
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
            marginRight: 16,
          }}
          source={{
            uri: app.apiClient._api.baseUrl + 'users/' + comment.uid + '/avatar.jpg',
          }}
        />
        <View>
          <Text>{comment.username}</Text>
          <Text
            style={{
              color: '#7A7A7A',
              fontSize: 12,
            }}>
            {new Date(comment.date).toLocaleString(app.i18n.curlang.value)}
          </Text>
        </View>
      </View>
      <Text style={{
        paddingLeft: 56,
        marginTop: 8,
        lineHeight: 24
      }}>
        {comment.content}
      </Text>
    </View>
  )
}

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
