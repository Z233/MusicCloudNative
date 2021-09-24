import React from "react";
import { StackNavigationProp, StackHeaderProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/routers";
import { Appbar } from "react-native-paper";
import { StatusBar } from "react-native";

const StackHeader = (props: Partial<StackHeaderProps>) => {
  console.log(props.route?.name, props.options);
  
  const options = props.options
  const title = options?.headerTitle

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
      <StatusBar backgroundColor="#ff6557" />
    </Appbar.Header>
  )
}

export default StackHeader