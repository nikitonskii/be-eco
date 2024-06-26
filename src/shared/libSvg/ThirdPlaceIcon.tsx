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
        d="M36.54 41.5a4.52 4.52 0 0 0 1.84-3.5c0-2.76-2.86-5-6.38-5s-6.37 2.24-6.37 5h3.92a2 2 0 0 1 3.9-.29c.17 1.23-.77 2.73-2 2.73v2.12c2.22 0 2.84 3.5.72 4.32A2 2 0 0 1 29.55 45h-3.92c0 2.76 2.85 5 6.37 5s6.38-2.24 6.38-5a4.52 4.52 0 0 0-1.84-3.5Z"
      />
    </G>
  </Svg>
);

export default SvgComponent;
