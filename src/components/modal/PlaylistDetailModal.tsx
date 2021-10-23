import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Api, useUserInfo } from '../../api';
import { ModalOperationProps } from './ModalOperation';
import CommonDetailModal from './CommonDetailModal';
import { useI18n } from '../../i18n/hooks';

const PlaylistDetailModal = () => {
  const {
    params: { title, owner, cover },
  } = useRoute() as { params: { title: string; owner: string; cover: string } };
  const { value: user } = useUserInfo()
  const I = useI18n();

  const operations: ModalOperationProps[] = ([
    {
      icon: {
        name: 'playlist-edit',
        from: 'MaterialCommunityIcons',
      },
      label: '重命名播放列表',
    },
    user.username != owner ? {
      icon: {
        name: 'favorite-border',
        from: 'MaterialIcons',
      },
      label: I`移除收藏`,
    } : null,
    user.username == owner ? {
      icon: {
        name: 'playlist-remove',
        from: 'MaterialCommunityIcons',
      },
      label: I`删除播放列表`,
    } : null,
    {
      icon: {
        name: 'share',
        from: 'MaterialIcons',
      },
      label: I`分享`,
    },
    {
      icon: {
        name: 'lock-outline',
        from: 'MaterialIcons',
      },
      label: I`设为公开`,
    },
  ] as ModalOperationProps[]).filter(x => x);

  return (
    <CommonDetailModal
      imgUrl={cover}
      title={title}
      subtitle={I`创建者：${owner}`}
      operations={operations}
    />
  );
};

export default PlaylistDetailModal;
