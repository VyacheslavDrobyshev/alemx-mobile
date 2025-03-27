import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { useSpacingStyles } from '../AppView/useSpacingStyles';

import { AppTouchableProps } from './types';

export const AppTouchable: FC<AppTouchableProps> = (props) => {
  const { children, style, ...rest } = props;

  const { box } = useSpacingStyles(props);

  return (
    <TouchableOpacity style={[box, style]} {...rest}>
      {children}
    </TouchableOpacity>
  );
};
