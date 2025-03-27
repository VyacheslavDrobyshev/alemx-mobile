import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';

import { useSpacingStyles } from '../AppView/useSpacingStyles';

import { AppScrollViewProps } from './types';

export const AppScrollView: React.FC<AppScrollViewProps> = (props) => {
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

  const styleProp = useMemo(() => [styles.box, style], [style, styles.box]);

  return (
    <ScrollView {...restProps} style={styleProp}>
      {children}
    </ScrollView>
  );
};
