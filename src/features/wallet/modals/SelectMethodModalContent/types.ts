import { AppIconName } from '@app/components/AppIcon/types.ts';

export type SelectMethodModalItem = {
  icon: AppIconName;
  title: string;
  subtitle: string;
  action: () => void;
};

export type SelectMethodModalContentProps = {
  items: SelectMethodModalItem[];
};
