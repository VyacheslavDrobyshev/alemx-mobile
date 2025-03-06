import { FC } from 'react';
import { AppScreen } from '@app/components';

import { AppTab } from '@app/components/AppTab/AppTab';
import { DigitalAssetsTab } from '@app/features/wallet/screens/Wallet/components/DigitalAssetsTab/DigitalAssetsTab.tsx';
import { BankCardsTab } from '@app/features/wallet/screens/Wallet/components/BankCardsTab/BankCardsTab.tsx';
import { walletTabs } from '@app/features/wallet/screens/Wallet/constants.ts';

export const WalletScreen: FC = () => {
  return (
    <AppScreen title={'Wallet'} noScroll>
      <AppTab tabs={walletTabs}>
        <DigitalAssetsTab />
        <BankCardsTab />
      </AppTab>
    </AppScreen>
  );
};
