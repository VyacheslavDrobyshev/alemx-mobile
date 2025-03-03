import { StyleSheet } from 'react-native';

import FONTS from './fonts';
import scale from './scale';

const TYPOGRAPHY = StyleSheet.create({
    f9_Body_Large: {
        fontSize: scale(16),
        fontFamily: FONTS.inter.regular,
        lineHeight: scale(20),
        letterSpacing: -scale(0.1),
    },
    f11_Body_Regular: {
        fontSize: scale(14),
        fontFamily: FONTS.inter.regular,
        lineHeight: scale(20),
    },
    f13_Body_Small_Regular: {
        fontSize: scale(12),
        fontFamily: FONTS.inter.regular,
        lineHeight: scale(16),
    },
    f16_Body_Medium_CAPS: {
        textTransform: 'uppercase',
        fontSize: scale(14),
        fontFamily: FONTS.inter.semiBold,
        lineHeight: scale(20),
    },
});

export default TYPOGRAPHY;
