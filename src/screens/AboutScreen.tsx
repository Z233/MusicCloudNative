import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import { useI18n, useI18nAdvanced } from '../i18n/hooks';

const AboutScreen = () => {
  const { I, IA } = useI18nAdvanced();
  return (
    <View style={{ padding: 24 }}>
      <Text style={styles.title}>Music Cloud{'\n'}for Android</Text>
      <Text style={styles.content}>
        {IA`开发者：${
          <Link text="Fronz" url="https://github.com/z233" />
          }、${
          <Link text="Yuuza" url="https://github.com/lideming" />
          }`}
      </Text>
      <Text style={styles.content}>{I`基于 React Native`}</Text>
    </View>
  );
};

const Link = (props: { text: string, url: string }) => (
  <Text style={{ color: '#5590dd' }}
    onPress={() => Linking.openURL(props.url)}>
    {props.text}
  </Text>
);

const styles = StyleSheet.create({
  title: { fontSize: 48, fontWeight: '700', marginVertical: 32 },
  content: { fontSize: 24, fontWeight: '400', marginVertical: 16 }
})

export default AboutScreen
