import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgWarning = ({ color, ...rest }: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...rest} fill="none">
    <Path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 16.002H12.01V16.012H12V16.002Z"
      stroke={color}
      strokeWidth="2.25"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11.998V7.99805"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgWarning;
