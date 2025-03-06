import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgCross = ({ color, ...rest }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...rest} fill={'none'}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L12 11.2929L17.6464 5.64645C17.8417 5.45118 18.1583 5.45118 18.3536 5.64645C18.5488 5.84171 18.5488 6.15829 18.3536 6.35355L12.7071 12L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L12 12.7071L6.35355 18.3536C6.15829 18.5488 5.84171 18.5488 5.64645 18.3536C5.45118 18.1583 5.45118 17.8417 5.64645 17.6464L11.2929 12L5.64645 6.35355Z"
      fill={color}
    />
  </Svg>
);
export default SvgCross;
