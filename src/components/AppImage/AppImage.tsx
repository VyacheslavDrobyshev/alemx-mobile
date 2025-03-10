import React, { FC, useMemo } from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';

import { useSpacingStyles } from '../AppView/useSpacingStyles';

import { AppImageProps } from './types';
import { isRequireSourceProps } from './utils';

export const AppImage: FC<AppImageProps> = props => {
  const { style, width, height, ...rest } = props;

  const { box } = useSpacingStyles(props);

  const styles = useMemo(() => [box as ImageStyle, style], [box, style]);

  const imgSource = useMemo<ImageSourcePropType>(
    () => (isRequireSourceProps(props) ? props.source : { uri: props.uri }),
    [props],
  );

  return <Image style={styles} source={imgSource} {...rest} />;
};
