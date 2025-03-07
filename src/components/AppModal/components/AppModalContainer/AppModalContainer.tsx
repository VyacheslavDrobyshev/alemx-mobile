import React, { FC } from 'react';
import { AppView } from '@app/components/AppView/AppView';
import { useAppTheme } from '@app/theme';
// import { AppSafeBottom, AppSafeTop } from '@app/components';

import { AppModalContainerProps } from './types';

export const AppModalContainer: FC<Omit<AppModalContainerProps, 'type'>> = ({
  children,
  // safeTop = true,
  // safeBottom = true,
  justifyContent = 'center',
  alignItems,
}) => {
  const { modalContainer } = useAppTheme();

  return (
    <AppView
      backgroundColor={modalContainer.backdropColor}
      flex={1}
      justifyContent={justifyContent}
      alignItems={alignItems}>
      {/*{safeTop && <AppSafeTop />}*/}
      {children}
      {/*{safeBottom && <AppSafeBottom />}*/}
    </AppView>
  );
};
