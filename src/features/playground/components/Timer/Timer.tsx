import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, withTiming, useAnimatedProps, cancelAnimation } from 'react-native-reanimated';

import styles from './Timer.styles';
import { MAX_QUIZ_TIMER_VALUE } from '../../config';

export interface TimerProps {
  points: number;
  endTimeHandler: () => void;
  options: number[];
  isStarted: boolean;
  ref?: any;
}

const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';
const CIRCLE_LENGTH = 140; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Timer: React.FC<TimerProps> = React.forwardRef(({ points, endTimeHandler, options, isStarted }, _ref) => {
  const [count, setCount] = React.useState<number>(0);
  const progress = useSharedValue(0);
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
      cancelAnimation(progress);
      progress.value = 0;

      if (options.length < 20) {
        progress.value = withTiming(1, { duration: 10000 });
      }
    }
  }, [points, options.length, isStarted]);

  React.useImperativeHandle(_ref, () => ({
    getTimerStateValue: () => count,
  }));

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  return (
    <View style={styles.container}>
      <Svg fill="none">
        <Circle cx={30} cy={30} r={R} stroke={BACKGROUND_STROKE_COLOR} strokeWidth={6} />
        <AnimatedCircle
          cx={30}
          cy={30}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={3}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <Text style={[isCloseToEnd ? styles.clock : styles.clockCloseToEnd, styles.clockCommon]}>{count}</Text>
    </View>
  );
});

export default Timer;
