import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { WalletNavigator } from '@app/walletFeature/wallet/navigation/WalletNavigator';
import { selectAccessToken } from '@app/walletFeature/auth/redux/selectors';
import { useSelector } from 'react-redux';

import { UnauthorizedNavigator } from '../auth/navigation';

export const RootNavigator: FC = () => {
  const isAuthenticated = useSelector(selectAccessToken);

  return (
    <NavigationContainer>
      {isAuthenticated ? <WalletNavigator /> : <UnauthorizedNavigator />}
    </NavigationContainer>
  );
};
