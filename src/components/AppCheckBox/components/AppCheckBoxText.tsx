import { AppText } from '@app/components/AppText/AppText';
import { AppTextProps } from '@app/components/AppText/types';
import { useAppTheme } from '@app/theme';
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
