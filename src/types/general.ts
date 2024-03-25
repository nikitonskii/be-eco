export interface SvgBasicProps {
  width?: string | number;
  height?: string | number;
  color?: string;
}

export type HintCurrency = {
  name: string;
  symbol: string;
};

export type HintInfo = {
  languages: string[];
  currency: HintCurrency[];
  continents: string[];
  capital: string;
  population: number;
};

export enum AvatarCodes {
  Croco = 'croco',
  Crab = 'crab',
  Rabbit = 'rabbit',
  Lion = 'lion',
  Jellyfish = 'jellyfish',
  Fox = 'fox',
  Elk = 'elk',
  Dyno = 'dyno',
  Raccon = 'raccon',
  Whale = 'whale',
}
