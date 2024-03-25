import { colors } from '@/shared/config/pallete';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: colors.green,
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default styles;
