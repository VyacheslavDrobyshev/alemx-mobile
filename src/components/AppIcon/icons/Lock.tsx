import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgLock = ({ color, ...rest }: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...rest} fill="none">
    <Path
      d="M3.99976 12.8714C3.99976 11.0465 3.99976 10.134 4.56671 9.56701C5.13366 9.00006 6.04615 9.00006 7.87113 9.00006H16.1284C17.9534 9.00006 18.8659 9.00006 19.4328 9.56701C19.9998 10.134 19.9998 11.0465 19.9998 12.8714V15.193C19.9998 17.9305 19.9998 19.2992 19.1493 20.1496C18.2989 21.0001 16.9302 21.0001 14.1927 21.0001H9.80682C7.06934 21.0001 5.70061 21.0001 4.85018 20.1496C3.99976 19.2992 3.99976 17.9305 3.99976 15.193V12.8714Z"
      stroke={color}
      strokeWidth="0.967844"
    />
    <Path
      d="M15.9995 8.00006V7.00006C15.9995 4.79092 14.2087 3.00006 11.9995 3.00006V3.00006C9.79037 3.00006 7.99951 4.79092 7.99951 7.00006V8.00006"
      stroke={color}
      strokeWidth="0.967844"
      strokeLinecap="round"
    />
    <Circle cx="11.9993" cy="15.0001" r="2" fill={color} />
  </Svg>
);
export default SvgLock;
