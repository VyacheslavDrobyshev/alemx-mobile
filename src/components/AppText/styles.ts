import { StyleSheet } from 'react-native';
import { AppTheme } from '@app/theme/AppThemeProvider';

import { AppTextProps } from './types';

export const getTextStylesFromTheme = ({ text }: AppTheme) => {
  const { color, ...textStyles } = text;

  return StyleSheet.create({
    defaultColor: { color },
    ...textStyles,
  });
};

export const getTextStylesFromProps = ({
  color,
  textAlign = 'left',
  textAlignVertical,
  fontWeight,
  fontSize,
  textDecorationLine,
  textTransform,
  lineHeight,
}: AppTextProps) =>
  StyleSheet.create({
    text: {
      ...(color ? { color } : null),
      ...(textAlign ? { textAlign } : null),
      ...(textAlignVertical ? { textAlignVertical } : null),
      ...(fontWeight ? { fontWeight } : null),
      ...(textDecorationLine ? { textDecorationLine } : null),
      ...(fontSize ? { fontSize } : null),
      ...(textTransform ? { textTransform } : null),
      ...(lineHeight ? { lineHeight } : null),
    },
  });
