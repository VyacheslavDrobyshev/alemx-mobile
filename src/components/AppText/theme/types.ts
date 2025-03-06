import { AppColorValue } from '@app/theme/types';
import { TextStyle } from 'react-native';

export type AppTextStyle = Pick<
  TextStyle,
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'textDecorationStyle'
> & { color?: AppColorValue };

export type AppTypography = {
  color: AppColorValue;

  regular_8_16: AppTextStyle;
  regular_10_16: AppTextStyle;
  regular_11_16: AppTextStyle;
  regular_12_18: AppTextStyle;
  regular_13_20: AppTextStyle;
  regular_14_20: AppTextStyle;
  regular_14_25: AppTextStyle;
  regular_15_20: AppTextStyle;
  regular_16_20: AppTextStyle;
  regular_25_38: AppTextStyle;

  medium_10_15: AppTextStyle;
  medium_11_20: AppTextStyle;
  medium_12_15: AppTextStyle;
  medium_12_18: AppTextStyle;
  medium_13_20: AppTextStyle;
  medium_14_20: AppTextStyle;
  medium_15_20: AppTextStyle;
  medium_16_24: AppTextStyle;
  medium_18_20: AppTextStyle;
  medium_20_30: AppTextStyle;
  medium_26_32: AppTextStyle;

  semi_bold_9_10: AppTextStyle;
  semi_bold_12_18: AppTextStyle;
  semi_bold_13_20: AppTextStyle;
  semi_bold_14_20: AppTextStyle;
  semi_bold_16_24: AppTextStyle;
  semi_bold_20_30: AppTextStyle;
  semi_bold_26_40: AppTextStyle;
};
export type AppTextStyleName = keyof Omit<AppTypography, 'color'>;
