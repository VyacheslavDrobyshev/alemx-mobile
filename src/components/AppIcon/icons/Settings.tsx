import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgSettings = ({ color = 'white', ...rest }: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...rest} fill="none">
    <Path d="M12 7L20 7" stroke={color} strokeLinecap="round" />
    <Path d="M4 7L8 7" stroke={color} strokeLinecap="round" />
    <Path d="M17 17L20 17" stroke={color} strokeLinecap="round" />
    <Path d="M4 17L12 17" stroke={color} strokeLinecap="round" />
    <Circle
      cx="10"
      cy="7"
      r="2"
      transform="rotate(90 10 7)"
      stroke={color}
      strokeLinecap="round"
    />
    <Circle
      cx="15"
      cy="17"
      r="2"
      transform="rotate(90 15 17)"
      stroke={color}
      strokeLinecap="round"
    />
  </Svg>
);
export default SvgSettings;
