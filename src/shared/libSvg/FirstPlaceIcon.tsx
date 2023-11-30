import * as React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 64 64">
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
        d="M34.13 43.63V33h-4.25a3.19 3.19 0 0 1-3.19 3.19h-1.06v4.25h4.25v3.19a2.13 2.13 0 0 1-2.13 2.12h-2.12V50h12.75v-4.25h-2.13a2.12 2.12 0 0 1-2.12-2.12Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;
