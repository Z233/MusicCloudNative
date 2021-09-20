import React from "react";
import { Text, View } from "react-native";
import MyAppbar from "../components/MyAppbar";

const LibraryPage = () => (
  <View style={{flex: 1}}>
    <MyAppbar title="Library" />
    <View style={{ backgroundColor: "#F4F4F4", padding: 16, paddingVertical: 24, flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Library WIP.</Text>
    </View>
  </View>
);

export default LibraryPage;