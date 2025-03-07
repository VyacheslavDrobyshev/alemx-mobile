import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-native';
import { AppView } from '@app/components/AppView/AppView';
import { WithElementChildren } from '@app/types';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '@app/features/auth/redux/selectors';

import { AppModalContext } from './contexts';
import { AppModalContextType, AppModalVariantsProps } from './types';
import {
  isAppBottomDrawerProps,
  isAppDialogProps,
  isAppModalContainerProps,
} from './utils';
import { AppModalType } from './constants';
import { AppDialog } from '@app/components';
import { AppBottomDrawer } from '@app/components';
import { AppModalContainer } from './components/AppModalContainer/AppModalContainer';

export const AppModalProvider: FC<WithElementChildren> = ({ children }) => {
  const [modalProps, setModalProps] = useState<AppModalVariantsProps[]>([]);
  const isAuthenticated = useSelector(selectAccessToken);

  const closeModal = useCallback<AppModalContextType['closeModal']>(() => {
    setModalProps(currentModals => currentModals.slice(0, -1));
  }, []);
  const closeAllModals = useCallback<
    AppModalContextType['closeAllModals']
  >(() => {
    setModalProps([]);
  }, []);

  const openDialog = useCallback<AppModalContextType['openDialog']>(dialog => {
    setTimeout(() => {
      setModalProps(currentModals => [
        ...currentModals,
        { ...dialog, type: AppModalType.Dialog },
      ]);
    });
  }, []);

  const openBottomDrawer = useCallback<AppModalContextType['openBottomDrawer']>(
    dialog => {
      setTimeout(() => {
        setModalProps(currentModals => [
          ...currentModals,
          { ...dialog, type: AppModalType.BottomDrawer, closeModal },
        ]);
      });
    },
    [closeModal],
  );

  const openModalContainer = useCallback<
    AppModalContextType['openModalContainer']
  >(dialog => {
    setTimeout(() => {
      setModalProps(currentModals => [
        ...currentModals,
        { ...dialog, type: AppModalType.Container },
      ]);
    });
  }, []);

  const contextValue = useMemo<AppModalContextType>(
    () => ({
      openDialog,
      openBottomDrawer,
      openModalContainer,
      closeAllModals,
      closeModal,
    }),
    [
      closeAllModals,
      closeModal,
      openBottomDrawer,
      openDialog,
      openModalContainer,
    ],
  );

  const currentModalProps = modalProps[modalProps.length - 1];

  useEffect(() => {
    if (!isAuthenticated) {
      closeAllModals();
    }
  }, [closeAllModals, isAuthenticated]);

  return (
    <AppModalContext.Provider value={contextValue}>
      {children}
      {currentModalProps ? (
        // visible ? <AppView>...</AppView> : null is required to handle bug with transparent bg in ios that leads to unresponsive app on close
        <AppView>
          <Modal
            {...(isAppDialogProps(currentModalProps) ? currentModalProps : {})}
            animationType="fade"
            onRequestClose={closeModal}
            transparent
            visible>
            {isAppDialogProps(currentModalProps) && (
              <AppDialog {...currentModalProps} />
            )}

            {isAppBottomDrawerProps(currentModalProps) && (
              <AppBottomDrawer {...currentModalProps} />
            )}

            {isAppModalContainerProps(currentModalProps) && (
              <AppModalContainer {...currentModalProps} />
            )}
          </Modal>
        </AppView>
      ) : null}
    </AppModalContext.Provider>
  );
};
