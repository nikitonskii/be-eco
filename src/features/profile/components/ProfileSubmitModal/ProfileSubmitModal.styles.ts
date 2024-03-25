import { StyleSheet } from 'react-native';

import { colors } from '@/shared/config/pallete';

const styles = StyleSheet.create({
  container: {},
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 12,
  },
});

export default styles;
