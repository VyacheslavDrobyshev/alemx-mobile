import { AppText } from '@app/walletFeature/wallet/common/components/AppText/AppText';
import { AppTextProps } from '@app/walletFeature/wallet/common/components/AppText/types';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import React, { FC } from 'react';

export const AppCheckBoxText: FC<AppTextProps> = ({
  children,
  textStyle,
  ...rest
}) => {
  const { checkBox } = useAppTheme();
  const labelTextStyle = textStyle ?? checkBox.text.textStyle;

  return (
    <AppText textStyle={labelTextStyle} {...rest}>
      {children}
    </AppText>
  );
};
