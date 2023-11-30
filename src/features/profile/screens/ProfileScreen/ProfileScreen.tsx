import * as React from 'react';
import { View, Text, ImageBackground, Modal, Pressable, TextInput, Alert } from 'react-native';
import { shallow } from 'zustand/shallow';
import firestore from '@react-native-firebase/firestore';

import { useBoundStore } from '@/store/store';

import { getTimeDifference } from '@/utils';
import Button from '@/shared/components/Button';
import styles from './ProfileScreen.styles';
import { useDebounce } from '@/shared/hooks';
import { FirstPlaceIcon, LastPlacesIcon, SecondPlaceIcon, ThirdPlaceIcon, UserIcon } from '@/shared/libSvg';

export interface Props {}

export const ProfileScreen: React.FC<Props> = () => {
  const imageSrc = require('@/features/profile/assets/img/background.png');
  const [total, timeRange, setUserNickname, nickName, userBestScore, setUserBestScore] = useBoundStore(
    state => [
      state.total,
      state.timeRange,
      state.setUserNickname,
      state.userNickname,
      state.userBestScore,
      state.setUserBestScore,
    ],
    shallow,
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>('');
  const debouncedName = useDebounce(userName, 300);
  const [error, setError] = React.useState<string>('');
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
    firestore()
      .collection('achievements')
      .doc(userName)
      .set({
        score: total,
      })
      .then(_ => {
        Alert.alert('Your result has been added! Thank you!');
        setUserBestScore(total);
      })
      .catch(e => Alert.alert(`It seems that something is wrong! /n ${e} `));
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
      .then(r => {
        setError(r.exists ? 'This nickname is already used' : '');
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

  const getUserScore = () => {
    if (nickName) {
      firestore()
        .collection('achievements')
        .doc(nickName)
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

    if (!error) {
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
    if (debouncedName) checkIfUserExists();
  }, [debouncedName]);

  return (
    <View style={styles.container}>
      <ImageBackground source={imageSrc} resizeMode="contain" style={{ flex: 1 }}>
        <View
          style={{
            marginLeft: 20,
            marginBottom: 20,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UserIcon width={30} height={30} />

            {nickName ? (
              <Text style={{ fontWeight: '800', color: '#000', fontSize: 18, marginLeft: 6 }}>{nickName}</Text>
            ) : (
              <Button
                title="Add name and score"
                onPress={() => setIsSubmitModalOpen(true)}
                containerStyle={{ borderWidth: 1, width: '60%', padding: 4, marginTop: 0, marginLeft: 10 }}
                textStyle={{ fontSize: 14 }}
              />
            )}
          </View>

          <Text style={{ color: '#000', fontSize: 18 }}>
            Best score: <Text style={{ fontWeight: '800' }}>{userBestScore}</Text>
          </Text>

          <Text style={{ color: '#000', fontSize: 18 }}>
            Last game score: <Text style={{ fontWeight: '800' }}>{total}</Text>
          </Text>
          <Text style={{ color: '#000', fontSize: 18 }}>
            Last game time:
            <Text style={{ fontWeight: '800' }}> {getTimeDifference(timeRange.start, timeRange.end)}</Text>
          </Text>
        </View>

        <View style={styles.topPlayersContainer}>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '900' }}>The Top Players</Text>
          {topPlayers.map((player, index) => {
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
          })}
        </View>
      </ImageBackground>

      {/* TODO: add to shared */}
      <Modal transparent={true} visible={isSubmitModalOpen}>
        <Pressable style={styles.modalBackground} onPress={() => setIsSubmitModalOpen(false)}>
          <View
            style={{
              backgroundColor: '#ffff',
              width: '70%',
              borderRadius: 10,
              borderWidth: 1,
              padding: 20,
            }}>
            <Text style={{ color: '#000', fontSize: 16 }}>Your nickname</Text>
            <TextInput
              value={userName}
              onChangeText={t => setUserName(t)}
              style={{ borderWidth: 1, padding: 4, color: '#000', marginTop: 6 }}
            />
            <Text style={{ color: 'red', fontSize: 10 }}>{error}</Text>
            <Button
              title="Go to the TOP!"
              onPress={onSubmitNickname}
              containerStyle={[
                {
                  borderWidth: 1,
                  width: '100%',
                  padding: 4,
                },
                styles.shadow,
              ]}
              textStyle={{ fontSize: 14 }}
              isDisabled={Boolean(error)}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
