import React, { FC } from 'react';
import { Text } from 'react-native';

import { AppTouchable } from '@app/components';

import { AppTextProps } from './types';
import { useAppText } from './useAppText';

export const AppText: FC<AppTextProps> = React.memo(props => {
  const {
    children,
    numberOfLines,
    onPress,
    noOpacityWrapper = false,
    ...rest
  } = props;
  const { style } = useAppText(props);

  const TextJSX = (
    <Text
      {...rest}
      style={style}
      numberOfLines={numberOfLines}
      onPress={noOpacityWrapper && onPress ? onPress : undefined}>
      {children}
    </Text>
  );

  return onPress && !noOpacityWrapper ? (
    <AppTouchable onPress={onPress}>{TextJSX}</AppTouchable>
  ) : (
    TextJSX
  );
});
