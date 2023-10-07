import * as React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './RiddleItem.styles';

export interface RiddleItemProps {
  image: string;

  imageUri?: string;
  imageAlt?: string;
  questionText?: string;
}

export const RiddleItem: React.FC<RiddleItemProps> = ({ imageUri, imageAlt, image }) => {
  if (!imageUri) {
    return <Text style={styles.defaultImage}>{image}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} resizeMode="contain" style={styles.image} alt={imageAlt} />
    </View>
  );
};

export default RiddleItem;
