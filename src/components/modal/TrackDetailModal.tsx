import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Api } from '../../api';
import { ModalOperationProps } from './ModalOperation';
import CommonDetailModal from './CommonDetailModal';

const TrackDetailModal = () => {
  const {
    params: { track },
  } = useRoute() as { params: { track: Api.Track } };

  const operations: ModalOperationProps[] = [
    {
      icon: {
        name: 'favorite-border',
        from: 'MaterialIcons',
      },
      label: '添加到最爱',
    },
    {
      icon: {
        name: 'remove-circle-outline',
        from: 'MaterialIcons',
      },
      label: '从当前播放列表移除',
    },
    {
      icon: {
        name: 'playlist-plus',
        from: 'MaterialCommunityIcons',
      },
      label: '添加到其他播放列表',
    },
    {
      icon: {
        name: 'playlist-play',
        from: 'MaterialCommunityIcons',
      },
      label: '添加到正在播放',
    },
    {
      icon: {
        name: 'cloud-download-outline',
        from: 'MaterialCommunityIcons',
      },
      label: '下载到本地',
    },
    {
      icon: {
        name: 'share',
        from: 'MaterialIcons',
      },
      label: '分享',
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
