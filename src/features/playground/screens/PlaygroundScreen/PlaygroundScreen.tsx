/* eslint-disable indent */
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';
import { shallow } from 'zustand/shallow';
import { v4 as uuidv4 } from 'uuid';
import * as Progress from 'react-native-progress';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { TestIds, BannerAd, BannerAdSize, useInterstitialAd } from 'react-native-google-mobile-ads';

import { useBoundStore } from '@/store/store';
import * as countriesDB from '@/shared/countries.json';
import { colors } from '@/shared/config/pallete';
import { Button } from '@/shared/components';
import { RootStackParams, RouteNames } from '@/types';
import { shuffle, generateRandomNumber, calculateTotal, getHintInfo } from '@/utils';
import { HintIcon } from '@/shared/libSvg';

import styles from './PlaygroundScreen.styles';
import { RiddleItem, Timer, HintModal } from '@/features/playground/components';
import {
  MAX_QUIZ_TIMER_VALUE,
  OPTIONS_AMOUNT_MAX,
  PROGRESS_PROPORTION,
  OPTION_STACK_MAX,
  ANIMATION_OFFSET_X,
  adMobId,
} from '@/features/playground/config';

const adIterstitialId = __DEV__ ? TestIds.INTERSTITIAL : adMobId;

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
    timeRange,
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
      state.timeRange,
    ],
    shallow,
  );
  const [isGameStarted, setIsGameStarted] = React.useState<boolean>(false);
  const timerRef = React.useRef<any>();

  const imageSrc = require('src/shared/assets/background1.png');
  const boatSrc = require('src/features/playground/assets/lottie/boat.json');
  const barProgress = (usedOptions.length / 100) * PROGRESS_PROPORTION;
  const [optionId, setOptionId] = React.useState<number>(generateRandomNumber(OPTIONS_AMOUNT_MAX, usedOptions));
  const optionsTranslateX = useSharedValue(ANIMATION_OFFSET_X);
  const flagTranslateX = useSharedValue(-ANIMATION_OFFSET_X);
  const [isHintModalOpen, setHintModal] = React.useState<boolean>(false);
  const isHintUsed = React.useRef<boolean>(false);
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adIterstitialId);

  React.useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  React.useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      load();
    }
  }, [isClosed]);

  const createNewQuiz = () => {
    if (usedOptions.length > OPTION_STACK_MAX) {
      clearUsedOptions();
    } else {
      addUsedOption(optionId);
    }
  };

  const regenerateQuiz = React.useCallback(() => {
    createNewQuiz();
    setOptionId(generateRandomNumber(OPTIONS_AMOUNT_MAX, usedOptions));
    isHintUsed.current = false;
  }, [points]);

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

  const getTimerState = () => {
    const timerState = timerRef.current.getTimerStateValue();

    if (timerState) {
      return Number(timerState);
    }

    return 1;
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
      <Animated.View
        style={[styles.buttonsContainer, { transform: [{ translateX: optionsTranslateX }] }]}
        key={uuidv4()}>
        {answersArray.length
          ? answersArray.map(option => <Button key={uuidv4()} title={option} onPress={onPressAnswerOption(option)} />)
          : null}
      </Animated.View>
    );
  }, [points]);

  React.useEffect(() => {
    if (usedOptions.length >= 20) {
      setIsGameStarted(false);
      setTimeRange({ end: new Date() });
      setTotal(calculateTotal(timeRange.start, timeRange.end, points, MAX_QUIZ_TIMER_VALUE * 20));
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

  React.useEffect(() => {
    //TODO: use constants to avoid magic numbers

    const secondsToClose = (8 - getTimerState()) * 1000;
    let timer: NodeJS.Timeout;

    if (isHintModalOpen) {
      timer = setTimeout(() => {
        setHintModal(false);
      }, secondsToClose);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isHintModalOpen]);

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
          <Text style={styles.scoreLabel}>
            Score:<Text style={styles.scorePoints}> {points}</Text>{' '}
          </Text>

          <Timer
            endTimeHandler={handleScoreIfTimeOut}
            points={points}
            options={usedOptions}
            isStarted={isGameStarted}
            ref={timerRef}
          />
        </View>

        {!isGameStarted && isLoaded ? <Button onPress={() => show()} title="Get extra points" /> : null}

        {isGameStarted ? (
          <Animated.View style={[styles.riddleWrapper, { transform: [{ translateX: flagTranslateX }] }]}>
            <RiddleItem image={countriesDB[optionId]?.flag} />
          </Animated.View>
        ) : null}

        {isGameStarted && !isHintUsed.current ? (
          <TouchableOpacity
            style={styles.hintButton}
            onPress={() => {
              setHintModal(true);
              isHintUsed.current = true;
            }}>
            <HintIcon width={40} height={40} />
          </TouchableOpacity>
        ) : null}

        <Lottie source={boatSrc} style={styles.lottieAnimation} autoPlay loop />

        <View style={styles.divider} />

        {!isGameStarted ? (
          <Button title="Start game" onPress={() => startGame()} containerStyle={{ borderWidth: 1 }} />
        ) : null}

        {generateAnswerButtons()}

        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </ImageBackground>

      <HintModal isOpened={isHintModalOpen} hintInfo={getHintInfo(optionId)} closeModal={() => setHintModal(false)} />
    </View>
  );
};

export default PlaygroundScreen;
