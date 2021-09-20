import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const IndexPage = () => (
  <>
    <StatusBar backgroundColor="#ff6557" />
    <MyAppbar />
    {/* <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
      Press me!!!
    </Button> */}
    <View style={{backgroundColor: "#F4F4F4", padding: 16, paddingVertical: 24, flex: 1}}>
      <Text style={{fontSize: 20, fontWeight: "700"}}>Hello Fronz.</Text>
      <History />
    </View>
  </>
);

const History = () => {
  return (
    <View style={{flexDirection: 'row', flexWrap: "wrap", marginTop: 16}}>
      <ListButton />
      <ListButton />
      <ListButton />
    </View>
  );
}

const ListButton = (props: {bg: any, icon: any, text: string}) => {
  return <View style={{width: '40%', height: 48, borderRadius: 8, backgroundColor: 'white', marginEnd: 24, marginBottom: 16}}>
    <Image 
      style={{width: 48, height: 48}}
     source={{uri: "https://mc.yuuza.net/api/storage/pic/223202bf-bc43-4eea-b81b-59394b84ef82.jpg"}} />
  </View>
};

const MyAppbar = () => (
  <Appbar.Header>
    <Appbar.Content title="MusicCloud" color="white" />
    <Appbar.Action icon="magnify" color="white" onPress={() => {}} />
  </Appbar.Header>
);

export default IndexPage;
