import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { IconButton, Searchbar, TouchableRipple, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor="transparent" />
      <View style={styles.searchBar}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.searchInput}
          selectionColor={theme.colors.primary}
          placeholder="搜索..."
          autoFocus={true}
        />
        <Icon name="search" size={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
    paddingRight: 16
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchScreen;
