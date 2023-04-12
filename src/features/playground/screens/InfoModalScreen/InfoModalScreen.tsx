import * as React from 'react';
import { View, Text } from 'react-native';

export interface Props {}

export const InfoModalScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>{'InfoModalScreen'}</Text>
    </View>
  );
};

export default InfoModalScreen;
