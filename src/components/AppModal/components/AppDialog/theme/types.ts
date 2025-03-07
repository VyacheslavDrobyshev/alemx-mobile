import { AppColorValue } from '@app/theme/types';
import { AppIconProps } from '@app/components/AppIcon/types';
import { AppTextProps } from '@app/components/AppText/types';
import { AppViewProps } from '@app/components/AppView/types';

export type DialogTheme = {
  container: AppViewProps;
  footer: AppViewProps;
  text: {
    title: AppTextProps;
    description: AppTextProps;
  };
  close: {
    height: number;
    marginTop: number;
    marginRight: number;
    color: AppColorValue;
  };
  icon: Omit<AppIconProps, 'name'>;
};
