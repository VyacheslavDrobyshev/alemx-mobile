import React, { FC } from 'react';

import { AppText } from '../AppText/AppText';
import { AppTouchable } from '../AppTouchable/AppTouchable';
import { AppActivityIndicator } from '../AppActivityIndicator/AppActivityIndicator';
import { AppIcon } from '../AppIcon/AppIcon';

import { AppButtonProps } from './types';
import { useAppButton } from './useAppButton';

const iconMargin = 5;

export const AppButton: FC<AppButtonProps> = React.memo((props) => {
  const {
    title,
    disabled,
    isLoading,
    textStyle = 'medium_14_20',
    onPress,
    leftIcon,
    rightIcon,
  } = props;
  const { containerProps, textProps, theme } = useAppButton(props);

  const iconHeight = (theme.text[textStyle].fontSize ?? 0) * 0.9;

  return (
    <AppTouchable
      {...containerProps}
      onPress={onPress}
      disabled={disabled || isLoading}
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      {...props}
    >
      {leftIcon && (
        <AppIcon
          name={leftIcon}
          height={iconHeight}
          marginRight={iconMargin}
          stroke={textProps.color}
        />
      )}
      {!!title && (
        <AppText {...textProps} textStyle={textStyle} textAlign="center">
          {title}
        </AppText>
      )}
      {rightIcon && (
        <AppIcon
          name={rightIcon}
          height={iconHeight}
          marginLeft={iconMargin}
          stroke={textProps.color}
        />
      )}
      {isLoading && <AppActivityIndicator absoluteFill size="small" />}
    </AppTouchable>
  );
});
