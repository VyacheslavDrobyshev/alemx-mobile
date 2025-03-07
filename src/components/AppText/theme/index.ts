import { AppColorScheme } from '@app/theme/types';

import { AppTextStyleName, AppTypography } from './types';

export const defaultTextStyle: AppTextStyleName = 'regular_13_20';

export enum FontFamily {
  Light = 'InterLight', // 300
  Regular = 'InterRegular', // 400
  Medium = 'InterMedium', // 500
  SemiBold = 'InterSemiBold', // 700
}

export const getTypographyTheme = (colors: AppColorScheme): AppTypography => ({
  color: colors.text,

  regular_8_16: {
    fontFamily: FontFamily.Regular,
    fontSize: 8,
    lineHeight: 16,
    fontWeight: 400,
  },
  regular_10_16: {
    fontFamily: FontFamily.Regular,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 400,
  },
  regular_11_16: {
    fontFamily: FontFamily.Regular,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: 400,
  },
  regular_12_18: {
    fontFamily: FontFamily.Regular,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
  },
  regular_13_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: 400,
  },
  regular_14_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
  },
  regular_14_25: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    lineHeight: 25,
    fontWeight: 400,
  },
  regular_15_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 400,
  },
  regular_16_20: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 400,
  },
  regular_25_38: {
    fontFamily: FontFamily.Regular,
    fontSize: 25,
    lineHeight: 38,
    fontWeight: 400,
  },

  medium_10_15: {
    fontFamily: FontFamily.Medium,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: 700,
  },
  medium_11_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 11,
    lineHeight: 20,
    fontWeight: 700,
  },
  medium_12_15: {
    fontFamily: FontFamily.Medium,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: 700,
  },
  medium_12_18: {
    fontFamily: FontFamily.Medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 700,
  },
  medium_13_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: 700,
  },
  medium_14_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  medium_15_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 700,
  },
  medium_16_24: {
    fontFamily: FontFamily.Medium,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
  },
  medium_18_20: {
    fontFamily: FontFamily.Medium,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 700,
  },
  medium_20_30: {
    fontFamily: FontFamily.Medium,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 700,
  },
  medium_26_32: {
    fontFamily: FontFamily.Medium,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 700,
  },

  semi_bold_9_10: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 9,
    lineHeight: 10,
    fontWeight: 700,
  },
  semi_bold_12_18: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 700,
  },
  semi_bold_13_20: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: 700,
  },
  semi_bold_14_20: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  semi_bold_16_24: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
  },
  semi_bold_20_30: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 700,
  },
  semi_bold_26_40: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 26,
    lineHeight: 40,
    fontWeight: 700,
  },
});
