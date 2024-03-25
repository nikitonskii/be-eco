import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 0,
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
    position: 'relative',
  },
  clock: {
    fontSize: 20,
    color: 'red',
    marginRight: 10,
    fontWeight: '900',
  },
  clockCloseToEnd: {
    fontWeight: '700',
    fontSize: 18,
    marginRight: 10,
  },
  clockCommon: {
    position: 'absolute',
    //left: 45,
  },
  clockAnimation: {
    width: 60,
    height: 60,
  },
});

export default styles;
