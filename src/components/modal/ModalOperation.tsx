import React from 'react';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchableCustom from '../TouchableCustom';
import { View, Text } from 'react-native';

export interface ModalOperationProps {
  icon: {
    from: 'MaterialIcons' | 'MaterialCommunityIcons';
    name: string;
  };
  label: string;
}

const ModalOperation = ({ icon, label }: ModalOperationProps) => {
  return (
    <TouchableCustom onPress={() => {}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
        }}>
        {(() => {
          const Icon = {
            MaterialIcons: MiIcon,
            MaterialCommunityIcons: McIcon,
          }[icon.from];
          return (
            <Icon
              name={icon.name}
              size={24}
              style={{
                marginRight: 24,
              }}
            />
          );
        })()}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      </View>
    </TouchableCustom>
  );
};

export default ModalOperation;
