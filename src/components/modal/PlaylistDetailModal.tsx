import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Api } from '../../api';
import { ModalOperationProps } from './ModalOperation';
import CommonDetailModal from './CommonDetailModal';

const PlaylistDetailModal = () => {
  const {
    params: { title, owner, cover },
  } = useRoute() as { params: { title: string; owner: string; cover: string } };

  const operations: ModalOperationProps[] = [
    {
      icon: {
        name: 'favorite-border',
        from: 'MaterialIcons',
      },
      label: '添加到收藏',
    },
    {
      icon: {
        name: 'playlist-edit',
        from: 'MaterialCommunityIcons',
      },
      label: '编辑播放列表',
    },
    {
      icon: {
        name: 'playlist-remove',
        from: 'MaterialCommunityIcons',
      },
      label: '删除播放列表',
    },
    {
      icon: {
        name: 'share',
        from: 'MaterialIcons',
      },
      label: '分享',
    },
    {
      icon: {
        name: 'lock-outline',
        from: 'MaterialIcons',
      },
      label: '设为公开',
    },
  ];

  return (
    <CommonDetailModal
      imgUrl={cover}
      title={title}
      subtitle={'创建者：' + owner}
      operations={operations}
    />
  );
};

export default PlaylistDetailModal;
