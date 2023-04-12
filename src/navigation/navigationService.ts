import * as React from 'react';
import {
  NavigationAction,
  NavigationContainerRef,
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackParams } from '@/types';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> = createNavigationContainerRef();

export const isMountedRef = React.createRef<boolean | null>();

export default class NavigationService {
  public static isReady: boolean;

  public static navigate(
    name: keyof RootStackParams,
    params?: Record<string, unknown>,
    //callback?: () => void,
  ) {
    if (this.isReady && navigationRef.current) {
      navigationRef.current.navigate(name, params);
    }
  }

  public static goBack() {
    if (this.isReady && navigationRef.current) {
      navigationRef.current.goBack();
    }
  }

  public static dispatch(action: NavigationAction) {
    if (this.isReady && navigationRef.current) {
      navigationRef.current.dispatch(action);
    }
  }

  public static setParam(param: any) {
    if (this.isReady && navigationRef.current) {
      navigationRef.current.setParams(param);
    }
  }

  public static replace = (name: string) => {
    if (this.isReady && navigationRef.current) {
      navigationRef.current.dispatch(
        CommonActions.reset({
          routes: [{ name }],
          index: 0,
        }),
      );
    }
  };

  // add other navigation functions that you need and export them
}
