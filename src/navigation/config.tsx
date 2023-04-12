import { TransitionPresets, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';

import { Dimensions } from 'react-native';

import { RouteNames, RootStackParams } from '../types';

const { width: screenWidth } = Dimensions.get('screen');

const headerHidden = {
  headerShown: false,
};

const noanimation = {
  animationEnabled: false,
};

const notitle = {
  headerTitle: '',
};

const backHidden = {
  headerLeft: () => null,
};

const headerStyle = {
  headerStyle: {
    backgroundColor: 'transparent',
  },
};

const rootStack: any = {
  initialRouteName: RouteNames.Playground,

  screenOptions: (props: StackScreenProps<RootStackParams>): StackNavigationOptions => {
    return {
      ...TransitionPresets.SlideFromRightIOS,
      headerTitle: props.route.name,
      headerLeft: () => null,
      headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
      },
      headerTitleStyle: {
        width: screenWidth, //TODO - check is right header buttons still pressable
        textAlign: 'left',
        fontSize: 26,
        fontWeight: '500',
        lineHeight: 32,
        color: 'transparent',
      },
    };
  },
};

const modalStack: any = {
  screenOptions: (_props: StackScreenProps<RootStackParams>) => {
    return {
      ...TransitionPresets.ModalPresentationIOS,
      ...headerHidden,
      presentation: 'transparentModal',
      gestureResponseDistance: 700,
    };
  },
};

export { headerHidden, headerStyle, noanimation, rootStack, notitle, backHidden, modalStack };
