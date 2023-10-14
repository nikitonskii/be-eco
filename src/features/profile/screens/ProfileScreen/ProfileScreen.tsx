import * as React from 'react';
import { View, Text, ImageBackground, Modal, Pressable, TextInput } from 'react-native';
import { shallow } from 'zustand/shallow';

import { useBoundStore } from '@/store/store';

import { getTimeDifference } from '@/utils';
import Button from '@/shared/components/Button';
import styles from './ProfileScreen.styles';
import firestore from '@react-native-firebase/firestore';

export interface Props {}

export const ProfileScreen: React.FC<Props> = () => {
  const imageSrc = require('@/features/profile/assets/img/background.png');
  const [total, timeRange, setUserNickname, nickName] = useBoundStore(
    state => [state.total, state.timeRange, state.setUserNickname, state.userNickname],
    shallow,
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>(''); //TODO: add debounce
  const [error, setError] = React.useState<string>('');
  const [topPlayers, setTopPlayers] = React.useState([]);

  const addScore = () => {
    firestore()
      .collection('achievements')
      .doc(userName)
      .set({
        score: total,
      })
      .then(r => {
        console.log('User added!', r);
      })
      .catch(e => console.log('Firebase ERR', e));
  };

  const updateScore = () => {
    firestore()
      .collection('achievements')
      .doc('ABC')
      .update({
        age: 31,
      })
      .then(() => {
        console.log('User updated!');
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

  React.useEffect(() => {
    checkIfUserExists();
  }, [userName]);

  const getTopScores = () => {
    firestore()
      .collection('achievements')
      // Order results
      .orderBy('score', 'desc')
      .limit(5)
      .get()
      .then(querySnapshot => {
        console.log('querySnapshot', querySnapshot);

        querySnapshot.forEach(documentSnapshot => {
          setTopPlayers(players => [...players, { nick: documentSnapshot.id, ...documentSnapshot.data() }]);

          //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });

    // firestore()
    //   .collection('achievements')
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(documentSnapshot => {
    //       setTopPlayers(players => [...players, { nick: documentSnapshot.id, ...documentSnapshot.data() }]);

    //       //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //     });
    //   });
  };

  React.useEffect(() => {
    getTopScores();
  }, []);

  console.log(topPlayers);

  return (
    <View style={styles.container}>
      <ImageBackground source={imageSrc} resizeMode="contain" style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#000', fontSize: 18 }}>
            Name: <Text style={{ fontWeight: '800' }}>{nickName}</Text>
          </Text>
          <Text style={{ color: '#000', fontSize: 18 }}>
            Score: <Text style={{ fontWeight: '800' }}>{total}</Text>
          </Text>
          <Text style={{ color: '#000', fontSize: 18 }}>
            Time:
            <Text style={{ fontWeight: '800' }}> {getTimeDifference(timeRange.start, timeRange.end)}</Text>
          </Text>
          <Button
            title="Add to global championship"
            onPress={() => setIsSubmitModalOpen(true)}
            containerStyle={{ borderWidth: 1, width: '70%', padding: 8 }}
          />
        </View>
        <View style={styles.topPlayersContainer}>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '900', marginTop: 10 }}>The Top Players</Text>
          {topPlayers.map(player => {
            return (
              <View style={{ backgroundColor: 'red', padding: 10 }} key={player.nick}>
                <Text>{player.nick}</Text>
                <Text>{player.score}</Text>
              </View>
            );
          })}
        </View>
      </ImageBackground>

      {/* TODO: add to shared */}
      <Modal transparent={true} visible={isSubmitModalOpen}>
        <Pressable style={styles.modalBackground} onPress={() => setIsSubmitModalOpen(false)}>
          <View style={{ backgroundColor: '#ffff', width: '70%', borderRadius: 10, borderWidth: 1, padding: 20 }}>
            <Text style={{ color: '#000', fontSize: 16 }}>Your nickname</Text>
            <TextInput
              value={userName}
              onChangeText={t => {
                setUserName(t);
              }}
              style={{ borderWidth: 1, padding: 4, color: '#000', marginTop: 6 }}
            />
            <Text style={{ color: 'red', fontSize: 10 }}>{error}</Text>
            <Button
              title="Go to the TOP!"
              onPress={() => {
                addScore();
                setIsSubmitModalOpen(false);
                setUserNickname(userName);
                setUserName('');
              }}
              containerStyle={[
                {
                  borderWidth: 1,
                  width: '100%',
                  padding: 4,
                },
                styles.shadow,
              ]}
              textStyle={{ fontSize: 14 }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
