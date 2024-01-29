import * as React from 'react';
import { View, Text } from 'react-native';

import { Modal, Button } from '@/shared/components';
import { CapitalIcon, CurrencyIcon, MapIcon, PopulationIcon } from '@/shared/libSvg';
import { HintInfo } from '@/types';

import styles from './HintModal.styles';

type HintModalProps = {
  isOpened: boolean;
  closeModal: () => void;
  hintInfo: HintInfo;
};

export const HintModal: React.FC<HintModalProps> = ({ isOpened, closeModal, hintInfo }) => {
  const population = new Intl.NumberFormat('en', { maximumSignificantDigits: 3 }).format(hintInfo.population);
  const renderCurrencies = React.useCallback(() => {
    return (
      <>
        {hintInfo.currency.map((currency, index) => (
          <Text key={currency.name}>
            {currency.name}{' '}
            <Text style={{ fontWeight: '700' }}>{`(${currency.symbol}) ${
              index === hintInfo.currency.length - 1 ? '' : '\n'
            }`}</Text>
          </Text>
        ))}
      </>
    );
  }, [hintInfo.currency]);

  const renderContinents = React.useCallback(() => {
    return (
      <>
        {hintInfo.continents.map((continent, index) => (
          <Text key={continent}>
            {continent} {`${index === hintInfo.continents.length - 1 ? '' : '\n'}`}
          </Text>
        ))}
      </>
    );
  }, [hintInfo.continents]);

  return (
    <Modal isVisible={isOpened} setVisibility={closeModal}>
      <View style={styles.wrapper}>
        <View style={{ justifyContent: 'center', width: '100%' }}>
          {/* TODO: make separate component for bubble */}
          <View style={styles.leftBubble}>
            <CapitalIcon width={64} height={64} />
            <View style={[styles.container, styles.botContainer]}>
              <View style={styles.triangleLeft} />
              <Text style={styles.message}>{hintInfo.capital}</Text>
            </View>
          </View>

          <View style={styles.rightBubble}>
            <View style={[styles.container, styles.userContainer]}>
              <View style={styles.triangleRight} />
              {renderCurrencies()}
            </View>
            <CurrencyIcon width={64} height={64} />
          </View>

          <View style={styles.leftBubble}>
            <MapIcon width={64} height={64} />
            <View style={[styles.container, styles.botContainer]}>
              <View style={styles.triangleLeft} />
              {renderContinents()}
            </View>
          </View>

          <View style={styles.rightBubble}>
            <View style={[styles.container, styles.userContainer]}>
              <View style={styles.triangleRight} />
              <Text>{population}</Text>
            </View>
            <PopulationIcon width={64} height={64} />
          </View>
        </View>
        <Button title="close" onPress={closeModal} containerStyle={{ alignSelf: 'center', padding: 10 }} />
      </View>
    </Modal>
  );
};

export default HintModal;
