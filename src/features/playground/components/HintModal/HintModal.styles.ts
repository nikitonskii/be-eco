import { colors } from '@/shared/config/pallete';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.summerSky, // User's message color
    marginRight: 20,
  },
  botContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.mediumSea, // Bot's message color
    marginLeft: 20,
  },
  triangleLeft: {
    position: 'absolute',
    left: -10,
    top: 8,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: colors.mediumSea, // Match the background color of the chat bubble
  },
  triangleRight: {
    position: 'absolute',
    right: -10,
    top: 8,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: colors.summerSky, // Match the background color of the chat bubble
  },
  message: {
    color: colors.white,
  },
  wrapper: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    width: '80%',
  },
  leftBubble: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
    width: '100%',
  },
  rightBubble: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
});

export default styles;
