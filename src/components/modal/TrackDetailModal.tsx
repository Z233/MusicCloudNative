import React, {
  ReactElement,
  PropsWithChildren,
  ReactPropTypes,
  Children,
} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Api } from '../../api';
import TouchableCustom from '../TouchableCustom';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface OperationProps {
  icon: ReactElement;
  label: string;
}

const Operation = ({ icon, label }: OperationProps) => {
  return (
    <TouchableCustom onPress={() => {}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
        }}>
        {icon}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      </View>
    </TouchableCustom>
  );
};

const TrackDetailModal = () => {
  const {
    params: { track },
  } = useRoute() as { params: { track: Api.Track } };
  const ICON_MARGIN_RIGHT = 24

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.coverWrapper}>
            <Image
              style={styles.cover}
              source={{
                uri: track.picurl,
              }}
            />
          </View>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.artist}>{track.artist}</Text>
        </View>
        <View style={styles.operations}>
          <Operation
            icon={
              <MiIcon
                name="favorite-border"
                size={24}
                style={{
                  marginRight: ICON_MARGIN_RIGHT,
                }}
              />
            }
            label="添加到最爱"
          />
          <Operation
            icon={
              <MiIcon
                name="remove-circle-outline"
                size={24}
                style={{
                  marginRight: ICON_MARGIN_RIGHT,
                }}
              />
            }
            label="从当前播放列表移除"
          />
          <Operation
            icon={
              <McIcon
                name="playlist-plus"
                size={24}
                style={{
                  marginRight: ICON_MARGIN_RIGHT,
                }}
              />
            }
            label="添加到其他播放列表"
          />
          <Operation
            icon={
              <McIcon
                name="playlist-play"
                size={24}
                style={{
                  marginRight: ICON_MARGIN_RIGHT,
                }}
              />
            }
            label="添加到正在播放"
          />
          <Operation
            icon={
              <McIcon
                name="cloud-download-outline"
                size={24}
                style={{
                  marginRight: ICON_MARGIN_RIGHT,
                }}
              />
            }
            label="下载到本地"
          />
          <Operation
            icon={
              <MiIcon
                name="share"
                size={24}
                style={{
                  marginRight: ICON_MARGIN_RIGHT,
                }}
              />
            }
            label="分享"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopEndRadius: 32,
    borderTopStartRadius: 32,
  },
  header: {
    padding: 24,
    display: 'flex',
    alignItems: 'center',
  },
  coverWrapper: {
    elevation: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 160,
    marginBottom: 16,
  },
  cover: {
    width: 160,
    aspectRatio: 1,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artist: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  operations: {
    padding: 16,
  },
});

export default TrackDetailModal;
