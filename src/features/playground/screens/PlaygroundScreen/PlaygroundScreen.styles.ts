import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT } from '@/shared/constants';
import { colors } from '@/shared/config/pallete';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: colors.playgroundBackground,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: SCREEN_HEIGHT / 10,
    flexWrap: 'wrap',
  },
  lottieAnimation: {
    width: 100,
    height: 50,
    position: 'absolute',
    top: '54%',
    left: '38%',
    transform: [{ rotate: '9deg' }],
  },
  divider: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  riddleWrapper: {
    padding: 16,
    backgroundColor: colors.white75,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  progressBar: {
    marginRight: 20,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  scorePoints: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    paddingLeft: 20,
  },
  scoreLabel: {
    marginLeft: 50,
    color: colors.black,
  },
  hintButton: {
    backgroundColor: colors.white75,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles;
