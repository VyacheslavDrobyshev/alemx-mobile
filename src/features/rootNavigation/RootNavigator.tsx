import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UnauthorizedNavigator } from '../auth/navigation';
import { WalletNavigator } from '@app/features/wallet/navigation/WalletNavigator.tsx';
import { selectAccessToken } from '@app/features/auth/redux/selectors.ts';
import { useSelector } from 'react-redux';

export const RootNavigator: FC = () => {
  const isAuthenticated = useSelector(selectAccessToken);

  return (
    <NavigationContainer>
      {isAuthenticated ? <WalletNavigator /> : <UnauthorizedNavigator />}
    </NavigationContainer>
  );
};
