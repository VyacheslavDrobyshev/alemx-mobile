import { AppIconName } from '@app/components/AppIcon/types';

export type SelectMethodModalItem = {
  icon: AppIconName;
  title: string;
  subtitle: string;
  action: () => void;
};

export type SelectMethodModalContentProps = {
  items: SelectMethodModalItem[];
};
