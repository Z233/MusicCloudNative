import { useNavigation } from '@react-navigation/core';
import React, { ReactElement } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

export const SECONDARY_HEADER_HEIGHT = 56;

interface Props {
  title: string;
  backDirection?: 'left' | 'down';
  dots?: () => void;
  right?: ReactElement;
}

const SecondaryHeader = ({ title, backDirection, dots, right }: Props) => {
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
          height: SECONDARY_HEADER_HEIGHT,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.colors.primary,
        }}>
        <IconButton
          icon={backDirection == 'down' ? 'chevron-down' : 'chevron-left'}
          size={32}
          color="#FFFFFF"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{title}</Text>
        {dots ? (
          <IconButton
            icon="dots-horizontal"
            size={32}
            color="#FFFFFF"
            onPress={dots}
          />
        ) : (
          <View style={{ width: 32, height: 32, margin: 14 }} />
        )}
      </View>
    </>
  );
};

export default SecondaryHeader;
