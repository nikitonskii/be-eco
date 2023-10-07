import * as React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './Timer.styles';
import { MAX_QUIZ_TIMER_VALUE } from '../../config';

export interface TimerProps {
  points: number;
  endTimeHandler: () => void;
  options: number[];
  isStarted: boolean;
  ref?: any;
}

export const Timer: React.FC<TimerProps> = React.forwardRef(({ points, endTimeHandler, options, isStarted }, _ref) => {
  const [count, setCount] = React.useState<number>(0);
  const clockSrc = require('src/features/playground/assets/lottie/time.json');
  const animationRef = React.useRef<LottieView>(null);

  const isCloseToEnd = count > 6 && count < MAX_QUIZ_TIMER_VALUE;

  const runInterval = () => {
    const _timer = setInterval(() => {
      if (count < MAX_QUIZ_TIMER_VALUE) {
        setCount(_count => _count + 1);
      }
    }, 1000);

    return _timer;
  };

  React.useEffect(() => {
    let timer: any;

    if (isStarted) {
      timer = runInterval();
    }

    if (options.length >= 20) {
      setCount(MAX_QUIZ_TIMER_VALUE);
      clearInterval(timer);
    }

    if (count >= MAX_QUIZ_TIMER_VALUE) {
      endTimeHandler();
      setCount(0);
    }

    return () => clearInterval(timer);
  }, [count, isStarted]);

  React.useEffect(() => {
    setCount(0);

    if (isStarted) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [points, options.length]);

  React.useImperativeHandle(_ref, () => ({
    getTimerStateValue: () => count,
  }));

  return (
    <View style={styles.container}>
      <Text style={[isCloseToEnd ? styles.clock : styles.clockCloseToEnd, styles.clockCommon]}>{count}</Text>
      <LottieView source={clockSrc} style={styles.clockAnimation} ref={animationRef} />
    </View>
  );
});

export default Timer;
