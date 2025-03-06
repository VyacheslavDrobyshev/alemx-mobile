import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { noHeaderOptions } from '../constants';

import { MainParamList } from './types';
import { MainRoute } from './constants';
import { WalletScreen } from '@app/features/wallet';

const Main = createNativeStackNavigator<MainParamList>();

export const MainNavigator: FC = () => {
  return (
    <Main.Navigator initialRouteName={MainRoute.Wallet}>
      <Main.Group screenOptions={noHeaderOptions}>
        <Main.Screen name={MainRoute.Wallet} component={WalletScreen} />
      </Main.Group>
    </Main.Navigator>
  );
};
