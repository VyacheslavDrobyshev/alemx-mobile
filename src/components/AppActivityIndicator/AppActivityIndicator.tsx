import React, { FC, useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useAppTheme } from '@app/theme';
import { AppView } from '@app/components';
import { AppViewProps } from '../AppView/types';

import { AppActivityIndicatorProps } from './types';

export const AppActivityIndicator: FC<AppActivityIndicatorProps> = ({
  type = 'secondary',
  size = 'large',
  absoluteFill,
  ...rest
}) => {
  const theme = useAppTheme();
  const absoluteFillProps = useMemo<AppViewProps>(
    () => ({
      style: StyleSheet.absoluteFill,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [],
  );
  return (
    <AppView {...(absoluteFill ? absoluteFillProps : {})} {...rest}>
      <ActivityIndicator
        size={size}
        color={
          type === 'primary' ? theme.colors.primary : theme.colors.placeholder
        }
      />
    </AppView>
  );
};
