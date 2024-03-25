import * as React from 'react';
import { View, Text, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { shallow } from 'zustand/shallow';
import firestore from '@react-native-firebase/firestore';

import { useBoundStore } from '@/store/store';
import { getTimeDifference } from '@/utils';
import { Button } from '@/shared/components';
import { useDebounce } from '@/shared/hooks';
import { FirstPlaceIcon, LastPlacesIcon, SecondPlaceIcon, ThirdPlaceIcon } from '@/shared/libSvg';
import { colors } from '@/shared/config/pallete';

import { ProfileSubmitModal, UserAvatar } from '@/features/profile/components';
import styles from './ProfileScreen.styles';

export const ProfileScreen: React.FC = () => {
  const imageSrc = require('@/features/profile/assets/img/background.png');
  const [total, timeRange, setUserNickname, nickName, userBestScore, setUserBestScore, userAvatar, setUserAvatar] =
    useBoundStore(
      state => [
        state.total,
        state.timeRange,
        state.setUserNickname,
        state.userNickname,
        state.userBestScore,
        state.setUserBestScore,
        state.userAvatar,
        state.setUserAvatar,
      ],
      shallow,
    );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>(''); //TODO: 1 obj for errs or even use useReducer
  const [secret, setSecret] = React.useState<string>('');
  const debouncedName = useDebounce(userName, 300);
  const debouncedSecret = useDebounce(secret, 300);
  const [error, setError] = React.useState<string>('');
  const [secretError, setSecretError] = React.useState<string>('');
  const [topPlayers, setTopPlayers] = React.useState<any>([]);

  const scoreIconsDict: { [key: number]: React.ReactElement } = {
    0: <FirstPlaceIcon width={30} height={30} />,
    1: <SecondPlaceIcon width={30} height={30} />,
    2: <ThirdPlaceIcon width={30} height={30} />,
  };

  const addScore = () => {
    if (!userName) {
      setError('Please provide your name or nick name');

      return;
    }
    if (!error && !secretError) {
      firestore()
        .collection('achievements')
        .doc(userName)
        .set({
          score: total > userBestScore ? total : userBestScore,
          secret: debouncedSecret,
        })
        .then(_ => {
          Alert.alert('Your result has been added! Thank you!');
          setUserBestScore(total);
        })
        .catch(e => Alert.alert(`It seems that something is wrong! /n ${e} `));
    }
  };

  const updateScore = () => {
    firestore()
      .collection('achievements')
      .doc(nickName)
      .update({
        score: total,
      })
      .then(() => {
        console.log('User updated!');
        setUserBestScore(total);
      });
  };

  const checkIfUserExists = () => {
    firestore()
      .collection('achievements')
      .doc(userName)
      .get()
      .then(user => {
        const isNameExists = user.exists;
        const isSecretWrong = user.data()?.secret !== debouncedSecret;

        if (isNameExists && !secret.length) {
          setError('This nickname is already used');
        } else if (isNameExists && isSecretWrong) {
          setSecretError('The secret for this name is wrong');
        } else {
          setSecretError('');
          setError('');
        }
      })
      .catch(e => console.log(e));
  };

  const getTopScores = () => {
    firestore()
      .collection('achievements')
      .orderBy('score', 'desc')
      .limit(5)
      .get()
      .then(querySnapshot => {
        const stats = querySnapshot.docs.map(player => {
          return { nick: player.id, ...player.data() };
        });

        setTopPlayers(stats);
      });
  };

  const getUserScore = (name?: string) => {
    const nameForUse = name ?? nickName;

    if (nameForUse) {
      firestore()
        .collection('achievements')
        .doc(nameForUse)
        .get()
        .then((user: any) => {
          setUserBestScore(user.data().score);
        })
        .catch(e => console.log(e));
    }
  };

  const onSubmitNickname = () => {
    if (userName === '') {
      setError('Please provide your name or nick name');
    }

    if (secret === '') {
      setSecretError('Please provide your secret');
    }

    if (!userName.length || !secret.length) {
      return;
    } else {
      addScore();
      setIsSubmitModalOpen(false);
      setUserNickname(userName);
      setUserName('');
    }
  };

  React.useEffect(() => {
    getTopScores();
    getUserScore();
  }, []);

  React.useEffect(() => {
    if (total > userBestScore && nickName) {
      updateScore();
    }
  }, [total]);

  React.useEffect(() => {
    if (debouncedName) {
      checkIfUserExists();
      getUserScore(debouncedName);
    }
  }, [debouncedName, debouncedSecret]);

  return (
    <View style={styles.container}>
      <ImageBackground source={imageSrc} resizeMode="contain" style={{ flex: 1 }}>
        <View
          style={{
            marginLeft: 20,
            marginBottom: 20,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UserAvatar avatarCode={userAvatar} setAvatarCode={setUserAvatar} />

            <View>
              {nickName ? (
                <Text style={{ fontWeight: '800', color: '#000', fontSize: 18, marginBottom: 10 }}>{nickName}</Text>
              ) : (
                <Button
                  title="Add name and score"
                  onPress={() => setIsSubmitModalOpen(true)}
                  containerStyle={{ borderWidth: 1, width: '80%', padding: 4, marginTop: 0, alignSelf: 'center' }}
                  textStyle={{ fontSize: 14 }}
                />
              )}
              <Text style={{ color: '#000', fontSize: 16 }}>
                Best score: <Text style={{ fontWeight: '800' }}>{userBestScore}</Text>
              </Text>

              <Text style={{ color: '#000', fontSize: 16 }}>
                Last game score: <Text style={{ fontWeight: '800' }}>{total}</Text>
              </Text>
              <Text style={{ color: '#000', fontSize: 16 }}>
                Last game time:
                <Text style={{ fontWeight: '800' }}> {getTimeDifference(timeRange.start, timeRange.end)}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.topPlayersContainer}>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '900' }}>Top Players</Text>

          {topPlayers.length ? (
            topPlayers.map((player, index) => {
              return (
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  key={player.nick}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {scoreIconsDict[index] ?? <LastPlacesIcon width={30} height={30} />}
                    <Text style={{ color: '#000', marginLeft: 10 }}>{player.nick}</Text>
                  </View>

                  <Text style={{ color: '#000' }}>{player.score} pts</Text>
                </View>
              );
            })
          ) : (
            <ActivityIndicator size="large" color={colors.mediumSea} />
          )}
        </View>
      </ImageBackground>

      <ProfileSubmitModal
        isOpen={isSubmitModalOpen}
        userName={userName}
        setUserName={t => setUserName(t.trim())}
        setSecret={t => setSecret(t.trim())}
        onSubmitNickname={onSubmitNickname}
        setIsSubmitModalOpen={setIsSubmitModalOpen}
        error={error}
        secretError={secretError}
        secret={secret}
      />
    </View>
  );
};

export default ProfileScreen;
