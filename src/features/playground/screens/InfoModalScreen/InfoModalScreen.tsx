import * as React from 'react';
import { View, Text } from 'react-native';

export interface Props {}

export const InfoModalScreen: React.FC<Props> = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Text>{'InfoModalScreen'}</Text>

      <View style={{ backgroundColor: '#fff', height: 300, width: '100%', justifyContent: 'flex-end' }}></View>
    </View>
  );
};

export default InfoModalScreen;
