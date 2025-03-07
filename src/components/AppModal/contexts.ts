import { createContext } from 'react';
import { noop } from 'lodash';

import { AppModalContextType } from './types';

export const initialAppModalContextValue: AppModalContextType = {
  openDialog: noop,
  openBottomDrawer: noop,
  openModalContainer: noop,
  closeAllModals: noop,
  closeModal: noop,
};

export const AppModalContext = createContext<AppModalContextType>(
  initialAppModalContextValue,
);
