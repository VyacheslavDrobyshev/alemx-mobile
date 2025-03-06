import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgMessage = ({ color, ...rest }: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...rest} fill="none">
    <Rect
      x="4"
      y="6"
      width="16"
      height="12"
      rx="2"
      stroke={color}
      strokeWidth="1"
    />
    <Path
      d="M3.99976 8.99988L11.1341 12.567C11.679 12.8395 12.3205 12.8395 12.8654 12.567L19.9998 8.99988"
      stroke={color}
      strokeWidth="1"
    />
  </Svg>
);
export default SvgMessage;
