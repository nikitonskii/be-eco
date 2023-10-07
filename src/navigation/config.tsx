import { TransitionPresets, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { Dimensions, TouchableOpacity } from 'react-native';

import { RouteNames, RootStackParams } from '../types';
import { colors } from '@/shared/config/pallete';
import Settings from '@/shared/libSvg/Settings';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

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

const headerStylesDict: { [key: string]: any } = {
  [RouteNames.Playground]: {
    backgroundColor: colors.playgroundBackground,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  [RouteNames.Profile]: {
    backgroundColor: colors.profileBackground,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
};

const setHeaderStyle = (routeName: RouteNames) => headerStylesDict[routeName];

const rootStack: any = {
  initialRouteName: RouteNames.Playground,

  screenOptions: (props: StackScreenProps<RootStackParams>): StackNavigationOptions => {
    return {
      ...TransitionPresets.SlideFromRightIOS,
      headerTitle: props.route.name,
      headerStyle: setHeaderStyle(props.route.name),
      // TODO: refactor
      headerRight: () =>
        props.route.name === RouteNames.Playground ? (
          <TouchableOpacity style={{ marginRight: 16 }} onPress={() => props.navigation.navigate(RouteNames.Profile)}>
            <Settings />
          </TouchableOpacity>
        ) : null,
      headerTitleStyle: {
        width: SCREEN_WIDTH, //TODO - check is right header buttons still pressable
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

export { headerHidden, noanimation, rootStack, notitle, backHidden, modalStack };
