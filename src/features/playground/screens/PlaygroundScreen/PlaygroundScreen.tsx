import { RootStackParams, RouteNames } from '@/types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button } from 'react-native';

import { useBoundStore } from '@/store/store';

export interface Props {}

export const PlaygroundScreen: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const addPoint = useBoundStore(state => state.addPoint);
  const points = useBoundStore(state => state.points);

  return (
    <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
      <Text>{'PlaygroundScreen'}</Text>
      <Text>You have {points} Points </Text>
      <Button title="Add point" onPress={addPoint} />
      <Button title="INFO" onPress={() => navigation.navigate(RouteNames.InfoModal)} />
      <Button title="PROFILE" onPress={() => navigation.navigate(RouteNames.Profile)} />
    </View>
  );
};

export default PlaygroundScreen;
