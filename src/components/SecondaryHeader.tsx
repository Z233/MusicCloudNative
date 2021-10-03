import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

interface Props {
  title: string;
}

const SecondaryHeader = ({ title }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          height: StatusBar.currentHeight,
          backgroundColor: theme.colors.primary,
        }}
      />
      <View
        style={{
          height: 56,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.colors.primary,
        }}>
        <IconButton
          icon="chevron-down"
          size={32}
          color="#FFFFFF"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{title}</Text>
        <IconButton icon="dots-horizontal" size={32} color="#FFFFFF" />
      </View>
    </>
  );
};

export default SecondaryHeader;
