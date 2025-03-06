import { AppColorScheme } from '@app/theme/types';

import { AppTextStyleName, AppTypography } from './types';

export const defaultTextStyle: AppTextStyleName = 'regular_13_20';

export enum FontFamily {
  Light = 'Poppins-Light', // 300
  Regular = 'Poppins-Regular', // 400
  Medium = 'Poppins-Medium', // 500
  SemiBold = 'Poppins-SemiBold', // 600
}

export const getTypographyTheme = (colors: AppColorScheme): AppTypography => ({
  color: colors.text,

  regular_8_16: {
    fontFamily: FontFamily.Regular,
    fontSize: 8,
    lineHeight: 16,
  },
  regular_10_16: {
    fontFamily: FontFamily.Regular,
    fontSize: 10,
    lineHeight: 16,
  },
  regular_11_16: {
    fontFamily: FontFamily.Regular,
    fontSize: 11,
    lineHeight: 16,
  },
  regular_12_18: {
    fontFamily: FontFamily.Regular,
    fontSize: 12,
    lineHeight: 18,
  },
  regular_13_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 13,
    lineHeight: 20,
  },
  regular_14_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    lineHeight: 20,
  },
  regular_14_25: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    lineHeight: 25,
  },
  regular_15_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 15,
    lineHeight: 20,
  },
  regular_16_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    lineHeight: 20,
  },
  regular_25_38: {
    fontFamily: FontFamily.Regular,
    fontSize: 25,
    lineHeight: 38,
  },

  medium_10_15: {
    fontFamily: FontFamily.Medium,
    fontSize: 10,
    lineHeight: 15,
  },
  medium_11_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 11,
    lineHeight: 20,
  },
  medium_12_15: {
    fontFamily: FontFamily.Medium,
    fontSize: 12,
    lineHeight: 15,
  },
  medium_12_18: {
    fontFamily: FontFamily.Medium,
    fontSize: 12,
    lineHeight: 18,
  },
  medium_13_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 13,
    lineHeight: 20,
  },
  medium_14_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 14,
    lineHeight: 20,
  },
  medium_15_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 15,
    lineHeight: 20,
  },
  medium_16_24: {
    fontFamily: FontFamily.Medium,
    fontSize: 16,
    lineHeight: 24,
  },
  medium_18_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 18,
    lineHeight: 20,
  },
  medium_20_30: {
    fontFamily: FontFamily.Medium,
    fontSize: 20,
    lineHeight: 30,
  },
  medium_26_32: {
    fontFamily: FontFamily.Medium,
    fontSize: 26,
    lineHeight: 32,
  },

  semi_bold_9_10: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 9,
    lineHeight: 10,
  },
  semi_bold_12_18: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 12,
    lineHeight: 18,
  },
  semi_bold_13_20: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 13,
    lineHeight: 20,
  },
  semi_bold_14_20: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 14,
    lineHeight: 20,
  },
  semi_bold_16_24: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  semi_bold_20_30: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 20,
    lineHeight: 30,
  },
  semi_bold_26_40: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 26,
    lineHeight: 40,
  },
});
