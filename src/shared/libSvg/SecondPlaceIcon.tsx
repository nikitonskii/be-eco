import * as React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
    <G xmlns="http://www.w3.org/2000/svg">
      <Path fill="#212529" d="m8.26 3 17.68 30.62 12.12-7L24.42 3H8.26z" />
      <Path fill="#111315" d="m38.06 26.62-7.21-12.5-3.72 6.44a21.53 21.53 0 0 0-7 3l5.8 10Z" />
      <Path fill="#dd051d" d="m34.6 28.62-5.2 3L12.87 3h6.93l14.8 25.62z" />
      <Path fill="#212529" d="M39.58 3 25.94 26.62l12.12 7L55.74 3H39.58z" />
      <Path fill="#a60416" d="m34.6 28.62-6.06-10.5-1.42 2.46a21.44 21.44 0 0 0-3.46 1.1l5.74 9.94Z" />
      <Path fill="#111315" d="M43.86 23.58a21.46 21.46 0 0 0-14.17-3.45l-3.75 6.49 12.12 7Z" />
      <Path fill="#dd051d" d="M51.13 3 34.6 31.62l-5.2-3L44.2 3h6.93z" />
      <Path fill="#a60416" d="m34.6 31.62 5.74-9.94a21.41 21.41 0 0 0-6-1.55l-4.94 8.49Z" />
      <Circle cx={32} cy={41.5} r={19.5} fill="#fccd1d" />
      <Circle cx={32} cy={41.5} r={14.5} fill="#f9a215" />
      <Path
        fill="#fccd1d"
        d="M33.88 33.57a6.49 6.49 0 0 0-5.81 1.23 6.41 6.41 0 0 0-2.21 4.89H30c0-2.24 3.37-2.38 4-1 1 2.1-8 7-8 7v4h12v-4h-4a7.07 7.07 0 0 0 4-7.54 6.16 6.16 0 0 0-4.12-4.58Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;
