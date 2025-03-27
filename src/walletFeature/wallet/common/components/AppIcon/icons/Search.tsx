import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

function SvgSearch({ color = 'white', ...rest }: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...rest} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4.5C7.41015 4.5 4.5 7.41015 4.5 11C4.5 14.5899 7.41015 17.5 11 17.5C14.5899 17.5 17.5 14.5899 17.5 11C17.5 7.41015 14.5899 4.5 11 4.5ZM5.5 11C5.5 7.96243 7.96243 5.5 11 5.5C14.0376 5.5 16.5 7.96243 16.5 11C16.5 14.0376 14.0376 16.5 11 16.5C7.96243 16.5 5.5 14.0376 5.5 11Z"
        fill={color}
      />
      <Path
        d="M17.3536 16.6464C17.1583 16.4512 16.8417 16.4512 16.6464 16.6464C16.4512 16.8417 16.4512 17.1583 16.6464 17.3536L19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L17.3536 16.6464Z"
        fill={color}
      />
    </Svg>
  );
}
export default SvgSearch;
