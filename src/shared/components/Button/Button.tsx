import * as React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import styles from './Button.styles';

export interface ButtonProps {
  onPress: () => void;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  onPress = () => null,
  title,
  containerStyle,
  isDisabled,
  textStyle,
}) => {
  return (
    <TouchableOpacity disabled={isDisabled} key={title} onPress={onPress} style={[styles.container, containerStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
