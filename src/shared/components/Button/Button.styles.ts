import { StyleSheet } from 'react-native';
import { colors } from '@/shared/config/pallete';

const styles = StyleSheet.create({
  container: {
    width: '45%',
    padding: 20,
    backgroundColor: colors.white75,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
