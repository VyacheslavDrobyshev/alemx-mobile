import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgCheck = ({ color, ...rest }: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...rest} fill="none">
    <Path d="M5 14L9 17L18 6" stroke={color} strokeWidth={1.5} />
  </Svg>
);
export default SvgCheck;
