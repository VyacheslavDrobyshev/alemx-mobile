import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { noHeaderOptions } from '../constants';

import { MainParamList } from './types';
import { MainRoute } from './constants';
import { WalletScreen } from '@app/features/wallet';
import { DepositScreen } from '@app/features/wallet/screens/Deposit/DepositScreen';
import { DepositDetailsScreen } from '@app/features/wallet/screens/DepositDetails/DepositDetailsScreen';
import { WithdrawScreen } from '@app/features/wallet/screens/Withdraw/WithdrawScreen';
import { WithdrawDetailsScreen } from '@app/features/wallet/screens/WithdrawDetails/WithdrawDetailsScreen';
import { HistoryScreen } from '@app/features/wallet/screens/History/History';
import { WalletDetailsScreen } from '@app/features/wallet/screens/WalletDetails/WalletDetailsScreen';
import { TransferUserScreen } from '@app/features/wallet/screens/Transfer/TransferUserScreen.tsx';
import { TransferAssetScreen } from '@app/features/wallet/screens/Transfer/TransferAssetScreen.tsx';
import { TransferDetailsScreen } from '@app/features/wallet/screens/TransferDetails/TransferDetailsScreen.tsx';

const Main = createNativeStackNavigator<MainParamList>();

export const MainNavigator: FC = () => {
  return (
    <Main.Navigator
      screenOptions={noHeaderOptions}
      initialRouteName={MainRoute.Wallet}>
      <Main.Screen name={MainRoute.Wallet} component={WalletScreen} />
      <Main.Screen
        name={MainRoute.WalletDetails}
        component={WalletDetailsScreen}
      />
      <Main.Screen name={MainRoute.Deposit} component={DepositScreen} />
      <Main.Screen
        name={MainRoute.DepositDetails}
        component={DepositDetailsScreen}
      />
      <Main.Screen name={MainRoute.Withdraw} component={WithdrawScreen} />
      <Main.Screen name={MainRoute.History} component={HistoryScreen} />
      <Main.Screen
        name={MainRoute.TransferUser}
        component={TransferUserScreen}
      />
      <Main.Screen
        name={MainRoute.TransferAsset}
        component={TransferAssetScreen}
      />
      <Main.Screen
        name={MainRoute.TransferDetails}
        component={TransferDetailsScreen}
      />
      <Main.Screen
        name={MainRoute.WithdrawDetails}
        component={WithdrawDetailsScreen}
      />
    </Main.Navigator>
  );
};
