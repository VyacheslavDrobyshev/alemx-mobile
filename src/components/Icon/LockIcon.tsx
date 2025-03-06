import React, { FC, memo } from 'react';

import Svg, { Path, Circle } from 'react-native-svg';

import scale from '../../styles/scale';

type Props = {
    width?: number;
    height?: number;
    fill?: string | false;
};

const SvgComponent: FC<Props> = (props) => {
    const {
        width,
        height,
        fill,
    } = props;

    return (
        <Svg
            viewBox="0 0 24 24 "
            width={width || scale(24)}
            height={height || scale(24)}
            fill="none"
        >
            <Path
                stroke={fill || '#fff'}
                strokeWidth={0.968}
                d="M4 12.871c0-1.825 0-2.737.567-3.304C5.134 9 6.047 9 7.87 9h8.257c1.825 0 2.738 0 3.305.567.567.567.567 1.48.567 3.304v2.322c0 2.737 0 4.106-.85 4.957-.851.85-2.22.85-4.957.85H9.807c-2.738 0-4.106 0-4.957-.85C4 19.3 4 17.93 4 15.193v-2.322Z"
            />

            <Path
                stroke={fill || '#fff'}
                strokeLinecap="round"
                strokeWidth={0.968}
                d="M16 8V7a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v1"
            />

            <Circle cx={11.999} cy={15} r={2} fill={fill || '#fff'} />
        </Svg>
    );
};

export default memo(SvgComponent);
