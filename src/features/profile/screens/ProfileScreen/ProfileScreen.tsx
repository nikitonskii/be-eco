import * as React from 'react';
import { View, Text } from 'react-native';

export interface Props {}

export const ProfileScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>{'ProfileScreen'}</Text>
    </View>
  );
};

export default ProfileScreen;
