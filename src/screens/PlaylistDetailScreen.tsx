import { useRoute } from '@react-navigation/core';
import React, { ReactElement, ReactNode, useState } from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import StickyParallaxHeader, {
  StickyParallaxHeaderProps,
} from 'react-native-sticky-parallax-header';
import { usePlayList } from '../api';
import { BigItem } from '../components/BigItem';
import SecondaryHeader, {
  SECONDARY_HEADER_HEIGHT,
} from '../components/SecondaryHeader';
import { arraySum } from '../utils/webfx';

const PlaylistDetailScreen = React.memo(() => {
  const { params } = useRoute() as { params: { id: number } };
  const theme = useTheme();
  const list = usePlayList(params.id);
  const keyMap = {} as any;
  const tracks = list.tracks?.map(track => {
    const keysurfix = (keyMap[track.id] = (keyMap[track.id] || 0) + 1);
    return { ...track, key: track.id + '_' + keysurfix };
  });
  console.info('list', list.id, tracks?.length);
  const totalMinutes = !tracks
    ? 0
    : Math.round(arraySum(tracks, x => x.length) / 60);
  const [hour, minutes] = [Math.round(totalMinutes / 60), totalMinutes % 60];

  const { event, Value } = Animated;
  const scrollY = new Value(0);

  interface PlayButtonProps {
    top?: Animated.AnimatedInterpolation;
    bottom?: number;
    opacity?: Animated.AnimatedInterpolation;
  }

  const PLAY_BUTTON_SIZE = 56;
  const OPACITY_TRIGGER_OFFSET =
    SECONDARY_HEADER_HEIGHT + 92 - PLAY_BUTTON_SIZE / 2;

  const PlayButton = ({ top, bottom, opacity }: PlayButtonProps) => (
    <Animated.View
      style={{
        position: 'absolute',
        flex: 1,
        height: PLAY_BUTTON_SIZE,
        width: PLAY_BUTTON_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        right: 24,
        top,
        bottom,
        opacity,
        elevation: 1,
      }}>
      <View style={{
        height: 24,
        width: 24,
        backgroundColor: theme.colors.primary,
        position: 'absolute'
      }} />
      <IconButton color="white" icon="play-circle" size={PLAY_BUTTON_SIZE} />
    </Animated.View>
  );

  const renderForeground = () => {
    const opacity = scrollY.interpolate({
      inputRange: [0, 20, 110],
      outputRange: [1, 1, 0],
    });
    const btnOpacity = scrollY.interpolate({
      inputRange: [
        -OPACITY_TRIGGER_OFFSET,
        0,
        OPACITY_TRIGGER_OFFSET,
        OPACITY_TRIGGER_OFFSET,
      ],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={{
          ...styles.listHeaderContainer,
          backgroundColor: theme.colors.primary,
        }}>
        <Animated.View style={{ flexDirection: 'row', opacity: opacity }}>
          <Image
            style={{
              width: 112,
              height: 112,
              borderRadius: 16,
            }}
            source={{ uri: list.picurl }}
          />
          <View style={{ marginLeft: 24 }}>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.subtitle}>
              {list.state == 'loading'
                ? '加载中……'
                : `${tracks?.length} 首，${
                    hour === 0 ? '' : hour + ' 小时 '
                  }${minutes} 分钟`}
            </Text>
            <Text style={styles.subtitle}>{list.ownerName}</Text>
          </View>
        </Animated.View>
        <View style={styles.operationContainer}>
          <IconButton
            style={styles.operationButton}
            icon="heart-outline"
            color="white"
          />
          <IconButton
            style={styles.operationButton}
            icon="download-circle-outline"
            color="white"
          />
          <IconButton
            style={styles.operationButton}
            icon="dots-vertical"
            color="white"
          />
        </View>
        <PlayButton bottom={8} opacity={btnOpacity} />
      </View>
    );
  };

  const renderHeader = (): ReactElement => <SecondaryHeader title={''} />;
  const renderPlayButton = () => {
    const opacity = scrollY.interpolate({
      inputRange: [
        -OPACITY_TRIGGER_OFFSET,
        0,
        OPACITY_TRIGGER_OFFSET,
        OPACITY_TRIGGER_OFFSET,
      ],
      outputRange: [1, 0, 0, 1],
      extrapolate: 'clamp',
    });
    const top = scrollY.interpolate({
      inputRange: [
        OPACITY_TRIGGER_OFFSET,
        OPACITY_TRIGGER_OFFSET + PLAY_BUTTON_SIZE / 2,
      ],
      outputRange: [
        StatusBar.currentHeight! + PLAY_BUTTON_SIZE,
        StatusBar.currentHeight! + PLAY_BUTTON_SIZE / 2,
      ],
      extrapolate: 'clamp',
    });
    return <PlayButton top={top} opacity={opacity} />;
  };
  const renderItems = () => (
    <FlatList
      data={tracks}
      renderItem={({ item }) => {
        return (
          <BigItem
            key={item.key}
            title={item.name}
            subtitle={item.artist}
            pic={item.picurl!}
          />
        );
      }}
      contentContainerStyle={styles.contentBox}
    />
  );

  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <StickyParallaxHeader
        headerType={undefined}
        backgroundColor="red"
        // @ts-expect-error
        foreground={renderForeground()}
        header={renderHeader()}
        decelerationRate="normal"
        headerSize={headerSizeProps => setHeaderHeight(headerSizeProps.height)}
        headerHeight={56 + StatusBar.currentHeight!}
        parallaxHeight={188}
        scrollEvent={event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          },
        )}
        tabs={[
          {
            title: 'Items',
            content: renderItems(),
          },
        ]}
        tabTextStyle={{
          display: 'none',
        }}
        tabsContainerStyle={{
          paddingTop: 16,
        }}
      />
      {renderPlayButton()}
    </>
  );
});

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  contentBox: {
    backgroundColor: '#F4F4F4',
    paddingBottom: 96,
    paddingHorizontal: 16,
  },
  listHeaderContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 16,
  },
  operationContainer: {
    flexDirection: 'row',
    marginLeft: -8,
  },
  operationButton: {
    marginRight: -4,
  },
  itemsHeader: {
    flexDirection: 'row-reverse',
  },
  playButton: {
    position: 'absolute',
    right: 0,
    bottom: -16,
  },
});

export default PlaylistDetailScreen;
