import { TextProps, TextStyle } from 'react-native';

import { AppViewProps } from '../AppView/types';

import { AppTextStyleName } from './theme/types';

export type AppTextProps = TextProps &
  TextStyle &
  Omit<AppViewProps, 'style'> & {
    textStyle?: AppTextStyleName;
    noOpacityWrapper?: boolean;
  };
