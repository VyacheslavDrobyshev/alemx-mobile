import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { noHeaderOptions } from '../constants';

import { WalletParamList } from './types';
import { WalletRoute } from './constants';
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

const Wallet = createNativeStackNavigator<WalletParamList>();

export const WalletNavigator: FC = () => {
  return (
    <Wallet.Navigator
      screenOptions={noHeaderOptions}
      initialRouteName={WalletRoute.Wallet}>
      <Wallet.Screen name={WalletRoute.Wallet} component={WalletScreen} />
      <Wallet.Screen
        name={WalletRoute.WalletDetails}
        component={WalletDetailsScreen}
      />
      <Wallet.Screen name={WalletRoute.Deposit} component={DepositScreen} />
      <Wallet.Screen
        name={WalletRoute.DepositDetails}
        component={DepositDetailsScreen}
      />
      <Wallet.Screen name={WalletRoute.Withdraw} component={WithdrawScreen} />
      <Wallet.Screen name={WalletRoute.History} component={HistoryScreen} />
      <Wallet.Screen
        name={WalletRoute.TransferUser}
        component={TransferUserScreen}
      />
      <Wallet.Screen
        name={WalletRoute.TransferAsset}
        component={TransferAssetScreen}
      />
      <Wallet.Screen
        name={WalletRoute.TransferDetails}
        component={TransferDetailsScreen}
      />
      <Wallet.Screen
        name={WalletRoute.WithdrawDetails}
        component={WithdrawDetailsScreen}
      />
    </Wallet.Navigator>
  );
};
