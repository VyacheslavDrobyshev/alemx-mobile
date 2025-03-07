import { AppBottomDrawerProps } from '@app/components/AppModal/components/AppBottomDrawer/AppBottomDrawer';

import { AppDialogProps } from './components/AppDialog/types';
import { AppModalContainerProps } from './components/AppModalContainer/types';

export type AppModalVariantsProps =
  | AppDialogProps
  | AppBottomDrawerProps
  | AppModalContainerProps;

export type AppModalContextType = {
  openDialog: (
    dialogProps: Omit<AppDialogProps, 'type' | 'closeModal'>,
  ) => void;
  openBottomDrawer: (
    bottomDrawerProps: Omit<AppBottomDrawerProps, 'type' | 'closeModal'>,
  ) => void;
  openModalContainer: (props: Omit<AppModalContainerProps, 'type'>) => void;
  closeModal: () => void;
  closeAllModals: () => void;
};
