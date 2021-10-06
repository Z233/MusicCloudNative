import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BigItem } from '../components/BigItem';
import { ScrollViewLayout } from '../layouts/ScrollViewLayout';
import layout from '../styles/layout';

const testpic =
  'https://mc.yuuza.net/api/storage/pic/223202bf-bc43-4eea-b81b-59394b84ef82.jpg';

const LibraryScreen = () => (
  <ScrollViewLayout>
    <View style={styles.itemsContainer}>
      <Text
        style={{
          marginBottom: 16,
        }}>
        今天
      </Text>
      <BigItem
        title="動く、動く.mp3"
        subtitle="8.7 MB，1 小时前"
        pic={testpic}
      />
      <BigItem
        title="動く、動く.mp3"
        subtitle="8.7 MB，1 小时前"
        pic={testpic}
      />
    </View>
    <View style={styles.itemsContainer}>
      <Text
        style={{
          marginBottom: 16,
        }}>
        9 月 18， 周六
      </Text>
      <BigItem
        title="動く、動く.mp3"
        subtitle="8.7 MB，9 月 18 日"
        pic={testpic}
      />
    </View>
  </ScrollViewLayout>
);

const styles = StyleSheet.create({
  itemsContainer: {
    marginBottom: 24,
  },
});

export default LibraryScreen;
