import { RouteNames } from '@/types';
import { RouteProp } from '@react-navigation/native';

export type RootStackParams = {
  [RouteNames.Playground]: undefined;
  [RouteNames.InfoModal]: {
    optionId: number;
  };
  [RouteNames.Profile]: undefined;
};

export type InfoModalScreenProps = RouteProp<RootStackParams, RouteNames.InfoModal>;
