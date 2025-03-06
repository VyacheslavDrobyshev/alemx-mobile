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
            viewBox="0 0 24 24 "
            width={width || scale(24)}
            height={height || scale(24)}
            fill="none"
        >
            <Path
                fill={fill || '#8C8D95'}
                d="M12.5 6a.5.5 0 0 0-1 0v5.5H6a.5.5 0 0 0 0 1h5.5V18a.5.5 0 0 0 1 0v-5.5H18a.5.5 0 0 0 0-1h-5.5V6Z"
            />
        </Svg>
    );
};

export default memo(SvgComponent);
