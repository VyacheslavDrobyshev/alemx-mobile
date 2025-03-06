import React from 'react';
import { View } from 'react-native';

import { useSpacingStyles } from './useSpacingStyles';
import { AppViewProps } from './types';

export const AppView: React.FC<AppViewProps> = (props) => {
  const {
    children,
    style,
    margin,
    marginVertical,
    marginHorizontal,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingVertical,
    paddingHorizontal,
    backgroundColor,
    height,
    width,
    alignItems,
    alignSelf,
    justifyContent,
    flexDirection,
    flex,
    position,
    bottom,
    top,
    left,
    right,
    borderStyle,
    borderColor,
    borderWidth,
    borderBottomWidth,
    borderTopWidth,
    borderRightWidth,
    borderLeftWidth,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderBottomLeftRadius,
    opacity,
    minHeight,
    minWidth,
    maxWidth,
    overflow,
    ...restProps
  } = props;

  const styles = useSpacingStyles(props);

  return (
    <View {...restProps} style={[styles.box, style]}>
      {children}
    </View>
  );
};
