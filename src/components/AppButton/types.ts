import { GestureResponderEvent } from 'react-native';

import { AppIconName } from '../AppIcon/types';
import { AppTextProps } from '../AppText/types';
import { AppTouchableProps } from '../AppTouchable/types';
import { AppViewProps } from '../AppView/types';

type AppButtonType = 'neutral' | 'primary' | 'secondary' | 'primaryOutlined';

export type AppButtonProps = {
  textStyle?: AppTextProps['textStyle'];
  title: string;
  type?: AppButtonType;
  isLoading?: boolean;
  leftIcon?: AppIconName;
  rightIcon?: AppIconName;
  onPress?: (event: GestureResponderEvent) => void;
} & AppTouchableProps;

type AppButtonTypeTheme = {
  container: Partial<AppViewProps>;
  text: Partial<AppTextProps>;
};

export type AppButtonTheme = {
  [key in AppButtonType]: AppButtonTypeTheme;
} & { disabled: AppButtonTypeTheme };
