import { StyleSheet } from 'react-native';

import FONTS from './fonts';
import scale from './scale';

const TYPOGRAPHY = StyleSheet.create({
  f10_Body: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: scale(14),
    lineHeight: scale(20),
  },
  f11_Body: {
    fontFamily: FONTS.inter.regular,
    fontSize: scale(14),
    lineHeight: scale(20),
  },
  f13_Body: {
    fontFamily: FONTS.inter.regular,
    fontSize: scale(12),
    lineHeight: scale(16),
  },
  f15_Body: {
    fontFamily: FONTS.inter.medium,
    fontSize: scale(10),
    lineHeight: scale(12),
  },
  f16_Body: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: scale(14),
    lineHeight: scale(20),
    textTransform: 'uppercase',
  },
  f3_Heading: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: scale(24),
    letterSpacing: -scale(1.2),
    lineHeight: scale(29),
  },
  f9_Body: {
    fontFamily: FONTS.inter.regular,
    fontSize: scale(16),
    letterSpacing: -scale(0.1),
    lineHeight: scale(20),
  },
});

export default TYPOGRAPHY;
