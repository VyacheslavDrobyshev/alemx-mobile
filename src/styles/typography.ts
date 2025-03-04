import { StyleSheet } from 'react-native';

import FONTS from './fonts';
import scale from './scale';

const TYPOGRAPHY = StyleSheet.create({
    f3_Heading: {
        fontSize: scale(24),
        fontFamily: FONTS.inter.semiBold,
        lineHeight: scale(29),
        letterSpacing: -scale(1.2),
    },
    f9_Body: {
        fontSize: scale(16),
        fontFamily: FONTS.inter.regular,
        lineHeight: scale(20),
        letterSpacing: -scale(0.1),
    },
    f10_Body: {
        fontSize: scale(14),
        fontFamily: FONTS.inter.semiBold,
        lineHeight: scale(20),
    },
    f11_Body: {
        fontSize: scale(14),
        fontFamily: FONTS.inter.regular,
        lineHeight: scale(20),
    },
    f13_Body: {
        fontSize: scale(12),
        fontFamily: FONTS.inter.regular,
        lineHeight: scale(16),
    },
    f15_Body: {
        fontSize: scale(10),
        fontFamily: FONTS.inter.medium,
        lineHeight: scale(12),
    },
    f16_Body: {
        textTransform: 'uppercase',
        fontSize: scale(14),
        fontFamily: FONTS.inter.semiBold,
        lineHeight: scale(20),
    },
});

export default TYPOGRAPHY;
