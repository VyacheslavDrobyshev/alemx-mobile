import { ElementChildrenType } from '@app/walletFeature/wallet/common/types';
import { AppButtonProps } from '@app/walletFeature/wallet/common/components/AppButton/types';
import { AppIconName } from '@app/walletFeature/wallet/common/components/AppIcon/types';

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
