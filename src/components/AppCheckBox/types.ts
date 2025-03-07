import { AppColorValue } from '@app/theme/types';

import { AppTextProps } from '../AppText/types';
import { AppViewProps } from '../AppView/types';

export type AppCheckBoxProps = {
  value: true | false | undefined;
  onPress: () => void;
  error?: string;
} & Omit<AppViewProps, 'onPress' | 'onLongPress'> &
  Omit<AppTextProps, 'onPress' | 'onLongPress'>;

export type AppCheckBoxTheme = {
  text: Pick<AppTextProps, 'textStyle'>;
  box: {
    height: number;
    borderWidth: number;
    borderRadius: number;
    marginRight: number;
  };
  unchecked: {
    borderColor: AppColorValue;
  };
  checked: {
    backgroundColor: AppColorValue;
    borderColor: AppColorValue;
  };
  icon: { color: AppColorValue };
};
