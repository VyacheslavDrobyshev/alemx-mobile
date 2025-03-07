import { FC, useEffect } from 'react';
import { AppScreen } from '@app/components';

import { AppTab } from '@app/components/AppTab/AppTab';
import { DigitalAssetsTab } from '@app/features/wallet/screens/Wallet/components/DigitalAssetsTab/DigitalAssetsTab.tsx';
import { BankCardsTab } from '@app/features/wallet/screens/Wallet/components/BankCardsTab/BankCardsTab.tsx';
import { walletTabs } from '@app/features/wallet/screens/Wallet/constants.ts';
import { useAppDispatch } from '@app/redux';
import {
  getAssetsThunk,
  getUnifiedBalanceThunk,
  getUserWalletsThunk,
} from '@app/features/wallet/screens/Wallet/redux/thunks.ts';

export const WalletScreen: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserWalletsThunk());
    dispatch(getUnifiedBalanceThunk());
    dispatch(getAssetsThunk());
  }, [dispatch]);

  return (
    <AppScreen withBottomTabs title={'Wallet'} noScroll>
      <AppTab tabs={walletTabs}>
        <DigitalAssetsTab />
        <BankCardsTab />
      </AppTab>
    </AppScreen>
  );
};
