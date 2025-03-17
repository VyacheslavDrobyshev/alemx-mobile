import { FC } from 'react';
import { AppScreen } from '@app/components';
import { HistoryTabContent } from '@app/features/wallet/components/HistoryTabContent/HistoryTabContent';

export const HistoryScreen: FC = () => (
  <AppScreen title="History" noScroll>
    <HistoryTabContent />
  </AppScreen>
);
