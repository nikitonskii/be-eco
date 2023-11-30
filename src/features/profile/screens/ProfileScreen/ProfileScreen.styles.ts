import { StyleSheet } from 'react-native';
import { colors } from '@/shared/config/pallete';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: colors.profileBackground,
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 12,
  },
  topPlayersContainer: {
    backgroundColor: colors.white75,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    margin: 8,
    paddingVertical: 20,
  },
  modalBackground: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.blue50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
