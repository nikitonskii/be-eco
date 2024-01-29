import * as React from 'react';
import { View, Text, TextInput } from 'react-native';

import { Button, Modal } from '@/shared/components';
import styles from './ProfileSubmitModal.styles';

type ProfileSubmitModalProps = {
  isOpen: boolean;
  userName: string;
  setUserName: (name: string) => void;
  error: string;
  secret: string;
  setSecret: (secret: string) => void;
  secretError: string;
  onSubmitNickname: () => void;
  setIsSubmitModalOpen: (val: boolean) => void;
};

export const ProfileSubmitModal: React.FC<ProfileSubmitModalProps> = ({
  isOpen,
  userName,
  setUserName,
  error,
  secret,
  secretError,
  setSecret,
  onSubmitNickname,
  setIsSubmitModalOpen,
}) => {
  return (
    <Modal isVisible={isOpen} setVisibility={() => setIsSubmitModalOpen(false)}>
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
          onChangeText={t => setUserName(t.trim())}
          style={{ borderWidth: 1, padding: 4, color: '#000', marginTop: 6 }}
        />
        <Text style={{ color: 'red', fontSize: 10 }}>{error}</Text>

        <Text style={{ color: '#000', fontSize: 16 }}>Secret</Text>
        <TextInput
          value={secret}
          onChangeText={t => setSecret(t.trim())}
          style={{ borderWidth: 1, padding: 4, color: '#000', marginTop: 6 }}
        />
        <Text style={{ color: 'red', fontSize: 10 }}>{secretError}</Text>

        {/* TODO: come up with better secret filed explanation */}
        <Text style={{ color: '#000', fontSize: 12 }}>
          The <Text style={{ color: '#000', letterSpacing: 1.2, fontSize: 12, fontWeight: '600' }}>secret</Text> field
          will keep your profile result on every device. Set it to keep your result
        </Text>

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
          isDisabled={Boolean(error) || Boolean(secretError)}
        />
        <Button
          title="Cancel"
          containerStyle={[
            {
              borderWidth: 1,
              width: '100%',
              padding: 4,
            },
            styles.shadow,
          ]}
          textStyle={{ fontSize: 14 }}
          onPress={() => setIsSubmitModalOpen(false)}
        />
      </View>
    </Modal>
  );
};

export default ProfileSubmitModal;
