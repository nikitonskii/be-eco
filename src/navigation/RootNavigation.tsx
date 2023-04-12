import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import NavigationService, { navigationRef } from './navigationService';
import RootStackNavigation from './RootStackNavigation';

const RootNavigation = () => {
  const onNavigationReady = () => {
    NavigationService.isReady = true;
  };

  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
