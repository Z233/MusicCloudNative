import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { IconButton, TouchableRipple, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSearch } from '../api';
import { PrimaryIconButton } from '../components/PrimaryHeader';
import TrackItem from '../components/TrackItem';
import { usePlayer } from '../player/hooks';

const SearchScreen = () => {
  const { results, newSearch } = useSearch();
  const player = usePlayer();
  return (
    <>
      <View style={styles.headerContainer}>
        <StatusBar backgroundColor="transparent" />
        <SearchBar onSearch={query => query && newSearch(query)} />
      </View>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <TrackItem track={item} onPress={() => player.playTrack(item)} />
        )}
        contentContainerStyle={{
          margin: 16,
          paddingBottom: 96,
        }}
      />
    </>
  );
};

const SearchBar = (props: { onSearch: (query: string) => void }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [input, setInput] = useState('');

  return (<View style={styles.searchBar}>
    <IconButton
      icon="chevron-left"
      size={32}
      onPress={() => navigation.goBack()}
    />
    <TextInput
      style={styles.searchInput}
      selectionColor={theme.colors.primary}
      value={input}
      onChangeText={setInput}
      placeholder="搜索..."
      autoFocus={true}
    />
    <PrimaryIconButton icon="search" onPress={() => props.onSearch(input)}/>
    {/* <Icon name="search" size={24} onPress={() => props.onSearch(input)} /> */}
  </View>
  )
}

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
