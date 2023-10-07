import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    left: 45,
  },
  clockAnimation: {
    width: 60,
    height: 60,
  },
});

export default styles;
