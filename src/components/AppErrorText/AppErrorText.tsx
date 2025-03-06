import React, { FC } from 'react';
import { useAppTheme } from '@app/theme';

import { AppText } from '@app/components';
import { AppTextProps } from '../AppText/types';

export const AppErrorText: FC<AppTextProps> = ({
  children,
  textStyle,
  ...rest
}) => {
  const theme = useAppTheme();
  return children ? (
    <AppText
      textAlign="left"
      color={theme.input.errorMessage.color}
      textStyle={textStyle ?? 'medium_12_15'}
      marginTop={3}
      {...rest}>
      {children}
    </AppText>
  ) : null;
};
