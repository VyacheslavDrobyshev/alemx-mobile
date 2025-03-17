import { FC } from 'react';
import { AppScreen } from '@app/components';
import { AppTab } from '@app/components/AppTab/AppTab';
import { DigitalAssetsTab } from '@app/features/wallet/screens/Wallet/components/DigitalAssetsTab/DigitalAssetsTab';
import { BankCardsTab } from '@app/features/wallet/screens/Wallet/components/BankCardsTab/BankCardsTab';
import { walletTabs } from '@app/features/wallet/screens/Wallet/constants';

export const WalletScreen: FC = () => (
  <AppScreen withBottomTabs title="Wallet" noScroll>
    <AppTab tabs={walletTabs}>
      <DigitalAssetsTab />
      <BankCardsTab />
    </AppTab>
  </AppScreen>
);
