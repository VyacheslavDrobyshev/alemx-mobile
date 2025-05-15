import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

function SvgChevronBottom({ color, ...rest }: SvgProps) {
  return (
    <Svg width="14" height="8" viewBox="0 0 14 8" {...rest} fill="none">
      <Path d="M13 0.999999L7 7L1 1" stroke={color} />
    </Svg>
  );
}
export default SvgChevronBottom;
