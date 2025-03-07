import { ElementChildrenType } from '@app/types';
import { AppButtonProps } from '@app/components/AppButton/types';
import { AppIconName } from '@app/components/AppIcon/types';

import { AppModalType } from '../../constants';

export type AppDialogProps = {
  title?: string;
  iconName?: AppIconName;
  iconFill?: string;
  description?: string;
  buttons?: AppButtonProps[];
  type: AppModalType.Dialog;
  body?: ElementChildrenType;
  withClose?: boolean;
};
