import { ElementChildrenType } from '@app/types';
import { AppViewProps } from '@app/components/AppView/types';

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
