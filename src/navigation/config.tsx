import { TransitionPresets, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import { RouteNames, RootStackParams } from '../types';
import { colors } from '@/shared/config/pallete';
import Settings from '@/shared/libSvg/Settings';

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
const headerTitlesDict: { [key: string]: string } = {
  [RouteNames.Playground]: '',
  [RouteNames.Profile]: 'Account Stat',
};
const headerTitleStyleDict: { [key: string]: any } = {
  [RouteNames.Playground]: {
    color: 'transparent',
  },
  [RouteNames.Profile]: { color: colors.black, fontSize: 26 },
};

const setHeaderStyle = (routeName: RouteNames) => headerStylesDict[routeName];
const setHeaderTitle = (routeName: RouteNames): string => headerTitlesDict[routeName];
const setHeaderTitleStyle = (routeName: RouteNames) => headerTitleStyleDict[routeName];

const rootStack: any = {
  initialRouteName: RouteNames.Playground,

  screenOptions: (props: StackScreenProps<RootStackParams>): StackNavigationOptions => {
    return {
      ...TransitionPresets.SlideFromRightIOS,
      headerTitle: setHeaderTitle(props.route.name),
      headerStyle: setHeaderStyle(props.route.name),
      // TODO: refactor
      headerRight: () =>
        props.route.name === RouteNames.Playground ? (
          <TouchableOpacity style={{ marginRight: 16 }} onPress={() => props.navigation.navigate(RouteNames.Profile)}>
            <Settings />
          </TouchableOpacity>
        ) : null,
      headerTitleStyle: setHeaderTitleStyle(props.route.name),
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
