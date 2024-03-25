import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
    <G data-name="Layer 35">
      <Path d="M32 10.5A21.52 21.52 0 0 0 10.5 32c1.18 28.52 41.82 28.51 43 0A21.52 21.52 0 0 0 32 10.5Zm0 40A18.52 18.52 0 0 1 13.5 32c1-24.54 36-24.54 37 0A18.52 18.52 0 0 1 32 50.5Z" />
      <Path d="M45.07 30.5H33.5V18.93a1.5 1.5 0 0 0-3 0V30.5H18.93a1.5 1.5 0 0 0 0 3H30.5v11.57a1.5 1.5 0 0 0 3 0V33.5h11.57a1.5 1.5 0 0 0 0-3Z" />
    </G>
  </Svg>
);

export default SvgComponent;
