import { AppIconName } from '@app/walletFeature/wallet/common/components/AppIcon/types';

export type SelectMethodModalItem = {
  disabled?: boolean;
  icon: AppIconName;
  title: string;
  subtitle: string;
  action: () => void;
};

export type SelectMethodModalContentProps = {
  items: SelectMethodModalItem[];
};
