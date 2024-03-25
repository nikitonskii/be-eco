import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
    <G data-name="20-Light Bulb">
      <Path fill="#f7f065" d="M32 3a20.998 20.998 0 0 0-10 39.463V49h20v-6.557A20.986 20.986 0 0 0 32 3Z" />
      <Path fill="#fcb860" d="M22 49h20v6H22Z" />
      <Path fill="#fcaa52" d="M24 55h16l-2 6H26Z" />
      <Path fill="#fc9e3a" d="m24 55 1 3h11.053l-1 3H38l2-6H24z" />
      <Path
        fill="#fcdf54"
        d="M53 24A20.987 20.987 0 0 0 35.35 3.292 21.948 21.948 0 0 1 39 43.012V49h3v-6.557A21 21 0 0 0 53 24Z"
      />
      <Path fill="#fcaa52" d="m39 54.996-.001.004H42v-6h-3v5.996z" />
      <Path d="M32 2a21.998 21.998 0 0 0-11 41.05V55a1 1 0 0 0 1 1h1.28l1.771 5.316A1 1 0 0 0 26 62h12a1 1 0 0 0 .949-.684L40.72 56H42a1 1 0 0 0 1-1V43.03A21.986 21.986 0 0 0 32 2Zm5.28 58H26.72l-1.332-4h13.225ZM23 54v-4h18v4Zm18.524-12.436a.998.998 0 0 0-.524.88V48h-6V26a3 3 0 1 1 3 3 1 1 0 0 0 0 2 5 5 0 1 0-5-5v22h-2V26a5 5 0 1 0-5 5 1 1 0 0 0 0-2 3 3 0 1 1 3-3v22h-6v-5.537a1 1 0 0 0-.524-.879 20.018 20.018 0 1 1 19.048-.02Z" />
    </G>
  </Svg>
);

export default SvgComponent;
