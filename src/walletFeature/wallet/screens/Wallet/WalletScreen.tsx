import { FC, useEffect } from 'react';
import { AppScreen } from '@app/walletFeature/wallet/common/components';
import { AppTab } from '@app/walletFeature/wallet/common/components/AppTab/AppTab';
import { DigitalAssetsTab } from '@app/walletFeature/wallet/screens/Wallet/components/DigitalAssetsTab/DigitalAssetsTab';
import { BankCardsTab } from '@app/walletFeature/wallet/screens/Wallet/components/BankCardsTab/BankCardsTab';
import { walletTabs } from '@app/walletFeature/wallet/screens/Wallet/constants';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import { getUserInfoThunk } from '@app/walletFeature/wallet/redux/thunks';

export const WalletScreen: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUserInfoThunk());
  }, [dispatch]);

  return (
    <AppScreen paddingBottom={0} title="Wallet" noScroll>
      <AppTab tabs={walletTabs}>
        <DigitalAssetsTab />
        <BankCardsTab />
      </AppTab>
    </AppScreen>
  );
};
