import { SvgProps } from 'react-native-svg';

import { AppViewProps } from '../AppView/types';

import { appIcons } from './constants';

export type AppIconName = keyof typeof appIcons;

export type AppIconProps = {
  name: AppIconName;
  ignoreRTL?: boolean;
  hitSlopValue?: number;
} & SvgProps &
  Partial<AppViewProps>;
