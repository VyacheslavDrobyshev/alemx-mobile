import { keys } from 'lodash';
import React, { FC, useMemo } from 'react';
import { AppTouchable } from '@app/components';

import { useSpacingStyles } from '../AppView/useSpacingStyles';

import { appIcons } from './constants';
import { AppIconName, AppIconProps } from './types';

export const AppIcon: FC<AppIconProps> = props => {
  const { name, height, width, fill, hitSlopValue, onPress, ...restProps } =
    props;
  const { box } = useSpacingStyles(restProps);

  const Icon = appIcons[name];

  const widthProp = width ?? height;
  const heightProp = height ?? width;

  const defaultProps = useMemo(
    () => ({
      ...(widthProp ? { width: widthProp } : {}),
      ...(heightProp ? { height: heightProp } : {}),
    }),
    [heightProp, widthProp],
  );

  const hitSlop = useMemo(
    () => ({
      top: hitSlopValue,
      bottom: hitSlopValue,
      left: hitSlopValue,
      right: hitSlopValue,
    }),
    [hitSlopValue],
  );

  const IconComponent = <Icon fill={fill} {...defaultProps} {...restProps} />;

  return onPress ? (
    <AppTouchable hitSlop={hitSlop} onPress={onPress} style={box}>
      {IconComponent}
    </AppTouchable>
  ) : (
    IconComponent
  );
};

export const appIconName = keys(appIcons).reduce(
  (acc, key) => ({
    ...acc,
    [key]: key,
  }),
  {} as { [key in AppIconName]: AppIconName },
);
