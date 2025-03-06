import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgCrossEye = ({ color, ...rest }: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...rest} fill="none">
    <Circle
      cx="11.9995"
      cy="11.9999"
      r="3.51608"
      stroke={color}
      strokeWidth="0.967844"
    />
    <Path
      d="M20.2143 10.9678C20.5894 11.4252 20.777 11.654 20.777 12.0001C20.777 12.3461 20.5894 12.5749 20.2143 13.0323C18.8074 14.7481 15.6581 18.0001 11.9988 18.0001C8.33942 18.0001 5.19014 14.7481 3.78328 13.0323C3.40815 12.5749 3.22059 12.3461 3.22059 12.0001C3.22059 11.654 3.40815 11.4252 3.78328 10.9678C5.19015 9.25206 8.33942 6.00006 11.9988 6.00006C15.6581 6.00006 18.8074 9.25206 20.2143 10.9678Z"
      stroke={color}
      strokeWidth="0.967844"
    />
  </Svg>
);
export default SvgCrossEye;
