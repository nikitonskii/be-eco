import * as React from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { shallow } from 'zustand/shallow';

import styles from './InfoModalScreen.styles';
import { InfoModalScreenProps } from '@/types';
import * as countriesDB from '@/shared/countries.json';
import { useBoundStore } from '@/store/store';

export const InfoModalScreen: React.FC = () => {
  const {
    params: { optionId },
  } = useRoute<InfoModalScreenProps>();
  const navigation = useNavigation();
  const [usedOptions] = useBoundStore(state => [state.usedOptions], shallow);

  const getCurrency = (_optionId: number) => {
    const currencyCode = Object.keys(countriesDB[_optionId]?.currencies)[0];

    return countriesDB[_optionId]?.currencies[currencyCode]?.name;
  };

  React.useEffect(() => {
    //navigation.goBack();
  }, [usedOptions.length]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>{optionId}</Text>
        <Text>Currency: {getCurrency(optionId)}</Text>

        {countriesDB[optionId].continents.map(continent => {
          return <Text>{continent}</Text>;
        })}
      </View>
    </View>
  );
};

export default InfoModalScreen;
