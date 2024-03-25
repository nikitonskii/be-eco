import { StyleSheet } from 'react-native';
import { colors } from '@/shared/config/pallete';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: colors.profileBackground,
  },
  topPlayersContainer: {
    backgroundColor: colors.white75,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    margin: 8,
    paddingVertical: 20,
  },
});

export default styles;
