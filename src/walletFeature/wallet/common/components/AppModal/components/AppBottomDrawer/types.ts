import { ElementChildrenType } from '@app/walletFeature/wallet/common/types';
import { AppViewProps } from '@app/walletFeature/wallet/common/components/AppView/types';

import { AppModalType } from '../../constants';

import { AppBottomDrawerHeaderProps } from './components/types';

export type AppBottomDrawerProps = AppBottomDrawerHeaderProps & {
  closeModal: () => void;
  noBottomInset?: boolean;
  minHeight?: AppViewProps['minHeight'];
  body: ElementChildrenType;
  type: AppModalType.BottomDrawer;
  closeOnBackdropPress?: boolean;
  safeTop?: boolean;
};
