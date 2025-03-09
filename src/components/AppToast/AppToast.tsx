import React, { FC } from 'react';
import { WithElementChildren } from '@app/types';

import { AppIcon, AppView } from '@app/components';
import { AppText } from '@app/components';

import { AppToastContext } from './context';
import { useAppToastProvider } from './useAppToastProvider';

export const AppToastProvider: FC<WithElementChildren> = ({ children }) => {
  const { value, toast, top, toastProps, theme } = useAppToastProvider();

  return (
    <AppToastContext.Provider value={value}>
      {children}
      {toast && toastProps && (
        <AppView
          elevation={3}
          shadowColor={'#000'}
          shadowOffset={{ width: 0, height: 10 }}
          shadowOpacity={0.5}
          shadowRadius={10}
          position="absolute"
          top={top}
          left={theme.screen.default.paddingHorizontal}
          right={theme.screen.default.paddingHorizontal}>
          <AppView {...toastProps.view}>
            <AppView
              marginRight={15}
              borderRadius={30}
              height={30}
              width={30}
              alignItems={'center'}
              justifyContent={'center'}
              backgroundColor={
                toast.type === 'error'
                  ? theme.colors.errorToastIcon
                  : theme.colors.successToastIcon
              }>
              {toast.type === 'error' && (
                <AppIcon name={'Warning'} color={'white'} />
              )}
              {toast.type === 'success' && (
                <AppIcon name={'Check'} color={'white'} />
              )}
            </AppView>
            <AppText {...toastProps.text}>{toast.message}</AppText>
          </AppView>
        </AppView>
      )}
    </AppToastContext.Provider>
  );
};
