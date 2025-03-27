import { AppColorValue } from '@app/walletFeature/wallet/common/theme/types';
import { AppIconProps } from '@app/walletFeature/wallet/common/components/AppIcon/types';
import { AppTextProps } from '@app/walletFeature/wallet/common/components/AppText/types';
import { AppViewProps } from '@app/walletFeature/wallet/common/components/AppView/types';

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
