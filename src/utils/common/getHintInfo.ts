import * as countriesDB from '@/shared/countries.json';
import { HintInfo } from '@/types';

export const getHintInfo = (_optionId: number): HintInfo => {
  if (typeof _optionId !== 'number') {
    throw TypeError('_optionId must be a number in getCurrency function');
  }

  const currentOption = countriesDB[_optionId];
  const currency = Object.values(currentOption?.currencies);
  const languages = Object.values(currentOption?.languages);

  const hintInfo = {
    currency: currency,
    capital: currentOption?.capital[0],
    continents: currentOption?.continents,
    population: currentOption?.population,
    languages: languages,
  };

  return hintInfo;
};
