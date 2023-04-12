import { RootStackParams, RouteNames } from '@/types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button } from 'react-native';

export interface Props {}

//console.log(require.resolve('@/types'));

export const PlaygroundScreen: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
      <Text>{'PlaygroundScreen'}</Text>
      <Button title="INFO" onPress={() => navigation.navigate(RouteNames.InfoModal)} />
    </View>
  );
};

export default PlaygroundScreen;
