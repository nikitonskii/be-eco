import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { rootStack, modalStack } from './config';

import { RootStackParams, RouteNames } from '../types';

import { PlaygroundScreen, InfoModalScreen } from '@/features/playground/screens';
import { ProfileScreen } from '@/features/profile/screens';

const RootStackNavigation: React.FC = () => {
  const Root = createStackNavigator<RootStackParams>();

  return (
    <Root.Navigator {...rootStack}>
      {true ? (
        <Root.Group {...rootStack}>
          <Root.Screen name={RouteNames.Playground} component={PlaygroundScreen} />

          {/* profile settings group */}
          <Root.Screen name={RouteNames.Profile} component={ProfileScreen} />

          {/* modals group */}
          <Root.Group {...modalStack}>
            <Root.Screen name={RouteNames.InfoModal} component={InfoModalScreen} />
          </Root.Group>
        </Root.Group>
      ) : (
        <Root.Group>{/* login group */}</Root.Group>
      )}
    </Root.Navigator>
  );
};

export default RootStackNavigation;
