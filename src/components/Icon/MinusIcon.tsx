import React, { FC, memo } from 'react';

import Svg, { Path } from 'react-native-svg';

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
            viewBox='0 0 24 24 '
            width={width || scale(24)}
            height={height || scale(24)}
            fill="none"
        >
            <Path stroke={fill || "#8C8D95"} strokeLinecap="round" d="M18 12H6" />
        </Svg>
    );
};

export default memo(SvgComponent);
