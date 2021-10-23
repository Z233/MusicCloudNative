import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ModalOperation, { ModalOperationProps } from './ModalOperation';
import { useNavigation } from '@react-navigation/native';

interface CommonDetailModalProps {
  imgUrl?: string;
  title: string;
  subtitle: string;
  operations: ModalOperationProps[];
}

const CommonDetailModal = ({
  imgUrl,
  title,
  subtitle,
  operations,
}: CommonDetailModalProps) => {
  const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: '#00000001',
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.preventDefault();
          nav.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.coverWrapper}>
            <Image
              style={styles.cover}
              source={{
                uri: imgUrl,
              }}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{subtitle}</Text>
        </View>
        <View style={styles.operations}>
          {operations.map((o, i) => (
            <ModalOperation {...o} key={o.label} />
          ))}
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default CommonDetailModal;
