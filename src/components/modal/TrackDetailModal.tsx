import React from 'react';
import {
  useRoute,
  NavigationProp,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import { Api, useFavouriteState, useComments, commentPaths } from '../../api';
import { ModalOperationProps } from './ModalOperation';
import CommonDetailModal from './CommonDetailModal';
import { useI18n } from '../../i18n/hooks';

export function navigate2CommentsScreen(
  track: Api.Track,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) {
  navigation.goBack();
  navigation.dispatch(
    CommonActions.navigate({
      name: 'Comments',
      params: {
        track
      }
    }),
  );
}

const TrackDetailModal = () => {
  const {
    params: { track },
  } = useRoute() as { params: { track: Api.Track } };
  const [fav, setFav] = useFavouriteState(track);
  const navigation = useNavigation();
  const I = useI18n();
  const { comments } = useComments(commentPaths.track(track.id));
  const commentCount = comments.comments?.length ?? null;

  const operations: ModalOperationProps[] = [
    {
      icon: {
        name: fav ? 'favorite' : 'favorite-border',
        from: 'MaterialIcons',
      },
      label: fav ? I`取消最爱` : I`添加到最爱`,
      onPress: () => {
        setFav(!fav);
      },
    },
    {
      icon: {
        name: 'remove-circle-outline',
        from: 'MaterialIcons',
      },
      label: I`从当前播放列表移除`,
    },
    {
      icon: {
        name: 'playlist-plus',
        from: 'MaterialCommunityIcons',
      },
      label: I`添加到其他播放列表`,
    },
    {
      icon: {
        name: 'playlist-play',
        from: 'MaterialCommunityIcons',
      },
      label: I`添加到正在播放`,
    },
    {
      icon: {
        name: 'cloud-download-outline',
        from: 'MaterialCommunityIcons',
      },
      label: I`下载到本地`,
    },
    {
      icon: {
        name: 'comment-multiple-outline',
        from: 'MaterialCommunityIcons',
      },
      label: commentCount == null ? I`查看评论` : I`查看评论（${commentCount}）`,
      onPress: () => navigate2CommentsScreen(track, navigation),
    },
    {
      icon: {
        name: 'share',
        from: 'MaterialIcons',
      },
      label: I`分享`,
    },
  ];

  return (
    <CommonDetailModal
      imgUrl={track.picurl}
      title={track.name}
      subtitle={track.artist}
      operations={operations}
    />
  );
};

export default TrackDetailModal;
