import React, { FC } from 'react';

import LockIcon from './LockIcon';

const icons = {
    lock: LockIcon,
};

export type IconType = keyof typeof icons;

type Props = {
    name: keyof typeof icons;
    width?: number;
    height?: number;
    fill?: string | false;
};

const Icon: FC<Props> = (props) => {
    const {
        name,
        width,
        height,
        fill,
    } = props;

    const IconComponent = icons[name];

    if (!IconComponent) {
        return null;
    };

    return (
        <IconComponent
            width={width}
            height={height}
            fill={fill}
        />
    );
};

export default Icon;
