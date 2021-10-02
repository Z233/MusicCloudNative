
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, Text, View, Image } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
//@ts-expect-error
import bar from './bar.png';

const FakeStatusBar = () => (
  <>
    <StatusBar barStyle="light-content" />
    <View style={{ height: StatusBar.currentHeight }}></View>
  </>
)

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={{ height: 56, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton icon="chevron-down" size={32} color="#FFFFFF" onPress={() => {
        navigation.goBack();
      }} />
      <Text style={{ fontSize: 20, color: '#FFFFFF' }}>正在播放</Text>
      <IconButton icon="dots-horizontal" size={32} color="#FFFFFF" />
    </View>
  );
};

// #FF6557
const PlayingScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FF6557' }}>
      <FakeStatusBar />
      <Header />
      <View style={{ backgroundColor: '#FFFFFF', flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
        <Picture />
        <Control />
      </View>
    </View>
  );
};

const Picture = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ elevation: 16, backgroundColor: '#FFFFFF', borderRadius: 16 }}>
      <Image
        style={{ width: '70%', aspectRatio: 1, borderRadius: 16 }}
        source={{ uri: 'https://mc-stor.yuuza.net/pic/467e08f4-6884-4461-9b98-a0176fed6f29.jpg' }} />
    </View>
  </View>
)

const Control = () => (
  <View style={{ flex: 0.8, alignSelf: 'center', width: '70%', justifyContent: 'space-evenly' }}>
    <View style={{ height: 60, width: '100%' }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Sincerely</Text>
      <Text style={{ position: 'absolute', left: 0, bottom: 0, fontSize: 16, color: 'rgba(0,0,0,0.24)' }}>TRUE</Text>
      <MiIcon style={{ position: 'absolute', right: 0, top: 14 }} name="favorite-border" size={32} />
    </View>
    <View style={{ width: '100%' }}>
      <Image source={bar} resizeMode='contain' style={{ width: '100%', height: 48 }} />
      <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 14 }}>02:21</Text>
        <Text style={{ fontSize: 14 }}>04:42</Text>
      </View>
    </View>
    <View style={{ flex: 0.3, alignSelf: 'center', width: '130%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
      <IconButton icon="cached" size={32} onPress={() => { }} />
      <IconButton icon="skip-previous" size={32} onPress={() => { }} />
      <View style={{ backgroundColor: '#FF6557', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <Icon name="pause" size={32} color='#FFFFFF' />
        <TouchableRipple
          style={{ position: 'absolute', height: '100%', width: '100%' }}
          onPress={() => { }}
          rippleColor="rgba(0, 0, 0, .2)">
          <View />
        </TouchableRipple>
      </View>
      <IconButton icon="skip-next" size={32} onPress={() => { }} />
      <IconButton icon="cached" size={32} onPress={() => { }} />
    </View>
  </View>
);

export default PlayingScreen;
