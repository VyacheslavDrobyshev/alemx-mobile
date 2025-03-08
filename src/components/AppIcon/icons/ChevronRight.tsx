import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgChevronRight = ({ color, ...rest }: SvgProps) => (
  <Svg width="8" height="14" viewBox="0 0 8 14" {...rest} fill="none">
    <Path d="M0.999999 1L7 7L0.999999 13" stroke={color} />
  </Svg>
);
export default SvgChevronRight;
