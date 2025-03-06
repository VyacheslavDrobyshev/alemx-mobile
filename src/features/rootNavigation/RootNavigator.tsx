import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UnauthorizedNavigator } from './unauthorized';
import { MainNavigator } from '@app/features/rootNavigation/main/MainNavigator.tsx';
import { selectAccessToken } from '@app/features/auth/redux/selectors.ts';
import { useSelector } from 'react-redux';

export const RootNavigator: FC = () => {
  const isAuthenticated = useSelector(selectAccessToken);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <UnauthorizedNavigator />}
    </NavigationContainer>
  );
};
