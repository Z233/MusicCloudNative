import React from 'react';
import { Text, View, FlatList, Animated } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Layout } from '../styles';
import PlaylistItem, { onPressPlaylistItem } from '../components/PlaylistItem';
import { ColumnsLayout } from '../layouts/ColumnsLayout';
import { RippleOverlay } from '../components/RippleOverlay';
import { useUserInfo } from '../api';
import { ScrollViewLayout } from '../layouts/ScrollViewLayout';
import layout from '../styles/layout';
import useScreenAnimation from '../hooks/useScreenAnimation';
import { ScreenProps } from '../utils/screen';

interface Props {
  onPressPlaylist: onPressPlaylistItem;
}

const PlaylistsScreen = React.memo((props: ScreenProps<Props>) => {
  const userinfo = useUserInfo();
  const screenAnimation = useScreenAnimation()
  return (
    <Animated.FlatList
      style={{
        ...layout.container,
        ...screenAnimation
      }}
      onScroll={props.screenState.getOnScroll()}
      contentContainerStyle={{ paddingBottom: 112 }}
      ListHeaderComponent={
        <View>
          <ColumnsLayout columns={2} style={{ marginBottom: 16 }}>
            <PlaylistButton icon="expand-all" text="最近添加" />
            <PlaylistButton icon="history" text="最近播放" />
          </ColumnsLayout>
          <PlaylistsHeader />
        </View>
      }
      data={userinfo.lists}
      renderItem={({ item }) => (
        <PlaylistItem
          id={item.id}
          onPress={props.onPressPlaylist}
          title={item.name}
          owner={item.ownerName}
          cover={item.picurl}
        />
      )}
    />
  );
});

const PlaylistsHeader = () => (
  <View
    style={{
      flexDirection: 'row',
      height: 28,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    }}>
    <IconButton
      icon="plus"
      size={24}
      color="rgba(0,0,0,.46)"
      style={{ alignSelf: 'center', margin: 0 }}
      onPress={() => {}}
    />
    <View style={{ height: 28, flexDirection: 'row', alignItems: 'center' }}>
      <Text>创建时间</Text>
      <IconButton
        icon="sort"
        size={16}
        color="rgba(0,0,0,.46)"
        style={{ alignSelf: 'center', margin: 0 }}
        onPress={() => {}}
      />
    </View>
  </View>
);

const PlaylistButton = (props: { icon: string; text: string }) => (
  <View
    style={{
      height: 56,
      borderRadius: 16,
      backgroundColor: 'white',
      overflow: 'hidden',
    }}>
    <View
      style={{
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name={props.icon} size={24} color="#918C8C" />
    </View>
    <View
      style={{
        paddingLeft: 56,
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
      }}>
      <Text style={{ marginLeft: 8, fontSize: 14, color: 'black' }}>
        {props.text}
      </Text>
    </View>
    <RippleOverlay onPress={() => {}} />
  </View>
);

export default PlaylistsScreen;
