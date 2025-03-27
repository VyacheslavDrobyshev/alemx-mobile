import { FC } from 'react';
import { AppScreen } from '@app/walletFeature/wallet/common/components';
import { HistoryTabContent } from '@app/walletFeature/wallet/components/HistoryTabContent/HistoryTabContent';

export const HistoryScreen: FC = () => (
  <AppScreen title="History" noScroll>
    <HistoryTabContent />
  </AppScreen>
);
