import { FC, useEffect } from 'react';
import { AppScreen } from '@app/components';
import { AppTab } from '@app/components/AppTab/AppTab';
import { DigitalAssetsTab } from '@app/features/wallet/screens/Wallet/components/DigitalAssetsTab/DigitalAssetsTab';
import { BankCardsTab } from '@app/features/wallet/screens/Wallet/components/BankCardsTab/BankCardsTab';
import { walletTabs } from '@app/features/wallet/screens/Wallet/constants';
import { useAppDispatch } from '@app/redux';
import { getUserInfoThunk } from '@app/features/auth/redux/thunks';

export const WalletScreen: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUserInfoThunk());
  }, [dispatch]);

  return (
    <AppScreen title="Wallet" noScroll>
      <AppTab tabs={walletTabs}>
        <DigitalAssetsTab />
        <BankCardsTab />
      </AppTab>
    </AppScreen>
  );
};
