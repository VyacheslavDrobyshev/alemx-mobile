import { useAppThemedStyles } from '@app/theme';
import { useSpacingStyles } from '../AppView/useSpacingStyles';

import { defaultTextStyle } from './theme';
import { getTextStylesFromTheme, getTextStylesFromProps } from './styles';
import { AppTextProps } from './types';

export const useAppText = (props: AppTextProps) => {
  const {
    style,
    textStyle,
    color,
    textAlign,
    textAlignVertical,
    fontWeight,
    fontSize,
    textDecorationLine,
    textTransform,
    lineHeight,
    ...restProps
  } = props;

  const { theme, styles } = useAppThemedStyles(getTextStylesFromTheme);
  const { box } = useSpacingStyles(restProps);

  const textStyleFromProps = getTextStylesFromProps({
    color,
    textAlign,
    textAlignVertical,
    fontWeight,
    fontSize,
    textDecorationLine,
    textTransform,
    lineHeight,
  });

  return {
    theme,
    style: [
      styles.defaultColor,
      styles[textStyle ?? defaultTextStyle],
      box,
      style,
      textStyleFromProps.text,
    ],
  };
};
