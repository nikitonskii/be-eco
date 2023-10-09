import * as React from 'react';
import { View, Text, ImageBackground, Modal, Pressable, TextInput } from 'react-native';
import { shallow } from 'zustand/shallow';

import { useBoundStore } from '@/store/store';

import { colors } from '@/shared/config/pallete';
import { getTimeDifference } from '@/utils';
import Button from '@/shared/components/Button';
import styles from './ProfileScreen.styles';
import FirebaseService from '@/shared/api/firebase';

export interface Props {}

export const ProfileScreen: React.FC<Props> = () => {
  const imageSrc = require('@/features/profile/assets/img/background.png');
  const [total, timeRange] = useBoundStore(state => [state.total, state.timeRange], shallow);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>('');

  console.log('dsdsd', FirebaseService);

  return (
    <View
      style={{ justifyContent: 'center', alignContent: 'center', flex: 1, backgroundColor: colors.profileBackground }}>
      <ImageBackground source={imageSrc} resizeMode="contain" style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white75,
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            margin: 8,
          }}>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '900', marginTop: 10 }}>The Top Players</Text>
        </View>
      </ImageBackground>

      {/* TODO: add to shared */}
      <Modal transparent={true} visible={isSubmitModalOpen}>
        <Pressable
          style={{
            width: '100%',
            flex: 1,
            backgroundColor: colors.blue50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsSubmitModalOpen(false)}>
          <View style={{ backgroundColor: '#ffff', width: '70%', borderRadius: 10, borderWidth: 1, padding: 20 }}>
            <Text style={{ color: '#000', fontSize: 16 }}>Your nickname</Text>
            <TextInput
              value={userName}
              onChangeText={t => setUserName(t)}
              style={{ borderWidth: 1, padding: 4, color: '#000', marginTop: 6 }}
            />
            <Text style={{ color: 'red', fontSize: 10 }}>{userName ? '' : 'This nickname is already used'}</Text>
            <Button
              title="Go to the TOP!"
              onPress={() => {
                setIsSubmitModalOpen(false);
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
