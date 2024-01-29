import * as React from 'react';
import { View, Modal as RNModal } from 'react-native';

import styles from './Modal.styles';

type ModalProps = {
  isVisible: boolean;
  children: any;
  setVisibility: () => void;
};

export const Modal: React.FC<ModalProps> = ({ isVisible, children, setVisibility }) => {
  return (
    <RNModal transparent={true} visible={isVisible} onRequestClose={setVisibility}>
      <View style={styles.modalBackground}>{children}</View>
    </RNModal>
  );
};

export default Modal;
