import React from 'react';
import { StatusBar, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const PrimaryHeader = () => {
  const statusHeight = StatusBar.currentHeight!;
  return (
    <View
      style={{
        paddingTop: statusHeight,
        height: statusHeight! + 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 1,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Icon
        style={{ marginLeft: 16, marginVertical: 16 }}
        name="menu"
        size={24}
        color="black"
      />
      <Icon
        style={{ marginRight: 16, marginVertical: 16 }}
        name="search"
        size={24}
        color="black"
      />
    </View>
  );
};

export default PrimaryHeader;
