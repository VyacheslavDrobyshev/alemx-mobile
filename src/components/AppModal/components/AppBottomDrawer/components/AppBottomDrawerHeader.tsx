import React, { FC } from 'react';
import { AppText } from '@app/components/AppText/AppText';
import { AppView } from '@app/components/AppView/AppView';
import { useAppTheme } from '@app/theme';

import { AppBottomDrawerHeaderProps } from './types';

export const AppBottomDrawerHeader: FC<AppBottomDrawerHeaderProps> = ({
  subTitle,
  title,
  withCloseButton,
}) => {
  const theme = useAppTheme();

  return subTitle || title || withCloseButton ? (
    <AppView marginBottom={20}>
      <AppView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <AppText textStyle="medium_16_24">{title ?? ''}</AppText>
      </AppView>
      {subTitle && (
        <AppText
          textStyle="regular_13_20"
          color={theme.colors.textSecondary}
          marginTop={4}
          marginBottom={6}>
          {subTitle}
        </AppText>
      )}
    </AppView>
  ) : null;
};
