import * as React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

import { AddAvatarIcon } from '@/shared/libSvg';
import { AvatarCodes } from '@/types';
import { avatarLib } from '../AvatarLib';
import { Button, Modal } from '@/shared/components';

export type UserAvatarProps = {
  avatarCode: AvatarCodes | undefined;
  setAvatarCode: (code: AvatarCodes | undefined) => void;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ avatarCode, setAvatarCode }) => {
  const [isAvatarsShown, setIsAvatarsShown] = React.useState<boolean>(false);
  const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = useWindowDimensions();
  const setAvatar = (code: AvatarCodes | undefined) => {
    setAvatarCode(code);
    setIsAvatarsShown(false);
  };

  //TODO: refactor
  return (
    <>
      <TouchableOpacity onPress={() => setIsAvatarsShown(true)}>
        {avatarCode ? (
          React.createElement(avatarLib[avatarCode], { width: 120, height: 120 })
        ) : (
          <View style={{ justifyContent: 'center', marginRight: 20 }}>
            <AddAvatarIcon width={80} height={80} />
            <Text style={{ color: '#000' }}>Add avatar</Text>
          </View>
        )}
      </TouchableOpacity>
      <Modal isVisible={isAvatarsShown} setVisibility={() => setIsAvatarsShown(false)}>
        <View
          style={{
            position: 'relative',
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
          }}>
          <View
            style={{
              backgroundColor: '#ffff',
              width: '90%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              borderRadius: 10,
              position: 'absolute',
              top: '25%',
              left: '5%',
              paddingBottom: 16,
            }}>
            {Object.entries(avatarLib).map(avatar => (
              <TouchableOpacity key={avatar[0]} onPress={() => setAvatar(avatar[0] as AvatarCodes)}>
                {React.createElement(avatar[1], { width: 80, height: 80 })}
              </TouchableOpacity>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                title="Delete avatar"
                containerStyle={{ padding: 5, borderWidth: 1, alignSelf: 'center' }}
                onPress={() => setAvatar(undefined)}
                textStyle={{ fontSize: 14 }}
              />
              <Button
                title="Cancel"
                containerStyle={{ padding: 5, borderWidth: 1, alignSelf: 'center' }}
                onPress={() => setIsAvatarsShown(false)}
                textStyle={{ fontSize: 14 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UserAvatar;
