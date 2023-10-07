/* eslint-disable indent */
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';
import { shallow } from 'zustand/shallow';
import { v4 as uuidv4 } from 'uuid';
import * as Progress from 'react-native-progress';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { useBoundStore } from '@/store/store';
import { RootStackParams, RouteNames } from '@/types';
import * as countriesDB from '@/shared/countries.json';

import { RiddleItem, Timer } from '@/features/playground/components';
import styles from './PlaygroundScreen.styles';
import Button from '@/shared/components/Button';
import { shuffle, generateRandomNumber } from '@/utils';
import { colors } from '@/shared/config/pallete';
import {
  MAX_QUIZ_TIMER_VALUE,
  OPTIONS_AMOUNT_MAX,
  PROGRESS_PROPORTION,
  OPTION_STACK_MAX,
  ANIMATION_OFFSET_X,
} from '@/features/playground/config';

export const PlaygroundScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [
    addPoint,
    subtructPoint,
    points,
    addUsedOption,
    usedOptions,
    clearUsedOptions,
    setTimeRange,
    resetPoints,
    setTotal,
  ] = useBoundStore(
    state => [
      state.addPoint,
      state.subtractPoint,
      state.points,
      state.addUsedOption,
      state.usedOptions,
      state.clearUsedOptions,
      state.setTimeRange,
      state.resetPoints,
      state.setTotal,
    ],
    shallow,
  );
  const [isGameStarted, setIsGameStarted] = React.useState<boolean>(false);
  const timerRef = React.useRef<any>();

  const imageSrc = require('src/features/playground/assets/img/background1.png');
  const boatSrc = require('src/features/playground/assets/lottie/boat.json');
  const barProgress = (usedOptions.length / 100) * PROGRESS_PROPORTION;
  const [optionId, setOptionId] = React.useState<number>(generateRandomNumber(OPTIONS_AMOUNT_MAX, usedOptions));
  const optionsTranslateX = useSharedValue(ANIMATION_OFFSET_X);
  const flagTranslateX = useSharedValue(-ANIMATION_OFFSET_X);

  const createNewQuiz = () => {
    if (usedOptions.length > OPTION_STACK_MAX) {
      clearUsedOptions();
    } else {
      addUsedOption(optionId);
    }
  };

  const regenerateQuiz = () => {
    createNewQuiz();
    setOptionId(generateRandomNumber(OPTIONS_AMOUNT_MAX, usedOptions));
  };

  const onPressAnswerOption = (option: string) => () => {
    option === countriesDB[optionId]?.name?.common
      ? addPoint(MAX_QUIZ_TIMER_VALUE - getTimerState())
      : subtructPoint(getTimerState());
    regenerateQuiz();
  };

  const handleScoreIfTimeOut = () => {
    subtructPoint(MAX_QUIZ_TIMER_VALUE);
    regenerateQuiz();
  };

  const generateAnswerButtons = React.useCallback(() => {
    const answersArray: string[] = [];
    const correctOption = countriesDB[optionId]?.name?.common;

    while (answersArray.length < 3) {
      const answerOption = countriesDB[generateRandomNumber(OPTIONS_AMOUNT_MAX)]?.name?.common;

      if (answerOption && !answersArray.includes(answerOption)) {
        answersArray.push(answerOption);
      }
    }

    answersArray.push(correctOption);
    shuffle(answersArray);

    return (
      <Animated.View style={[styles.buttonsContainer, { transform: [{ translateX: optionsTranslateX }] }]}>
        {answersArray.length
          ? answersArray.map(option => <Button key={uuidv4()} title={option} onPress={onPressAnswerOption(option)} />)
          : null}
      </Animated.View>
    );
  }, [points]);

  React.useEffect(() => {
    if (usedOptions.length >= 20) {
      //Alert.alert('END OF THE GAME');

      setIsGameStarted(false);
      setTimeRange({ end: new Date() });
      setTotal(points);
      resetPoints();
      clearUsedOptions();
      navigation.navigate(RouteNames.Profile);

      //animation
      optionsTranslateX.value = withSpring(optionsTranslateX.value + ANIMATION_OFFSET_X);
      flagTranslateX.value = withSpring(flagTranslateX.value - ANIMATION_OFFSET_X);
    }
  }, [usedOptions.length]);

  const startGame = () => {
    setTimeRange({ start: new Date() });
    setIsGameStarted(true);
  };

  React.useEffect(() => {
    if (isGameStarted) {
      optionsTranslateX.value = withSpring(optionsTranslateX.value - ANIMATION_OFFSET_X);
      flagTranslateX.value = withSpring(flagTranslateX.value + ANIMATION_OFFSET_X);
    }
  }, [isGameStarted]);

  const getTimerState = () => {
    const timerState = timerRef.current.getTimerStateValue();

    if (timerState) {
      return Number(timerState);
    }

    return 1;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageSrc} resizeMode="contain" style={styles.background}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Progress.Bar
            progress={barProgress}
            width={200}
            color={colors.profileBackground}
            style={styles.progressBar}
          />
          <Text>{`${usedOptions.length} of 20`}</Text>
        </View>

        <View style={styles.timerWrapper}>
          <Text style={{ marginLeft: 50, color: '#000' }}>
            Score:<Text style={{ fontSize: 16, fontWeight: '700', color: '#000', paddingLeft: 20 }}> {points}</Text>{' '}
          </Text>

          <Timer
            endTimeHandler={handleScoreIfTimeOut}
            points={points}
            options={usedOptions}
            isStarted={isGameStarted}
            ref={timerRef}
          />
        </View>

        <Animated.View style={[styles.riddleWrapper, { transform: [{ translateX: flagTranslateX }] }]}>
          <RiddleItem image={countriesDB[optionId]?.flag} />

          <TouchableOpacity
            style={{ justifyContent: 'flex-end' }}
            onPress={() => navigation.navigate(RouteNames.InfoModal)}>
            <Text>HINT</Text>
          </TouchableOpacity>
        </Animated.View>

        <Lottie source={boatSrc} style={styles.lottieAnimation} autoPlay loop />

        <View style={styles.divider} />
        {!isGameStarted ? (
          <Button title="Start game" onPress={() => startGame()} containerStyle={{ borderWidth: 1 }} />
        ) : null}

        {generateAnswerButtons()}
      </ImageBackground>
    </View>
  );
};

export default PlaygroundScreen;
