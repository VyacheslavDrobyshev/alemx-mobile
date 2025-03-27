import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { WalletScreen } from '@app/walletFeature/wallet';
import { DepositScreen } from '@app/walletFeature/wallet/screens/Deposit/DepositScreen';
import { DepositDetailsScreen } from '@app/walletFeature/wallet/screens/DepositDetails/DepositDetailsScreen';
import { WithdrawScreen } from '@app/walletFeature/wallet/screens/Withdraw/WithdrawScreen';
import { WithdrawDetailsScreen } from '@app/walletFeature/wallet/screens/WithdrawDetails/WithdrawDetailsScreen';
import { HistoryScreen } from '@app/walletFeature/wallet/screens/History/History';
import { WalletDetailsScreen } from '@app/walletFeature/wallet/screens/WalletDetails/WalletDetailsScreen';
import { TransferUserScreen } from '@app/walletFeature/wallet/screens/Transfer/TransferUserScreen';
import { TransferAssetScreen } from '@app/walletFeature/wallet/screens/Transfer/TransferAssetScreen';
import { TransferDetailsScreen } from '@app/walletFeature/wallet/screens/TransferDetails/TransferDetailsScreen';
import { TransactionDetailsScreen } from '@app/walletFeature/wallet/screens/TransactionDetails/TransactionDetails';
import NetworkLogger from 'react-native-network-logger';
import { AppScreen } from '@app/walletFeature/wallet/common/components';
import { SwapScreen } from '@app/walletFeature/wallet/screens/Swap/Swap';
import { SwapAssetsScreen } from '@app/walletFeature/wallet/screens/SwapAssets/SwapAssets';

import { noHeaderOptions } from '../../rootNavigation/constants';

import { WalletRoute } from './constants';
import { WalletParamList } from './types';

const Wallet = createNativeStackNavigator<WalletParamList>();

const NetworkLoggerScreen = () => (
  <AppScreen noScroll>
    <NetworkLogger />
  </AppScreen>
);

export const WalletNavigator: FC = () => (
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
      name={WalletRoute.TransactionDetails}
      component={TransactionDetailsScreen}
    />
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
    <Wallet.Screen name={WalletRoute.Swap} component={SwapScreen} />
    <Wallet.Screen name={WalletRoute.SwapAssets} component={SwapAssetsScreen} />
    <Wallet.Screen
      name={WalletRoute.NetworkLogger}
      component={NetworkLoggerScreen}
    />
  </Wallet.Navigator>
);
