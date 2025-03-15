import { FC } from 'react';

import { AppScreen } from '@app/components';
import { HistoryTabContent } from '@app/features/wallet/components/HistoryTabContent/HistoryTabContent.tsx';

export const HistoryScreen: FC = () => {
  return (
    <AppScreen title={'History'} noScroll>
      <HistoryTabContent />
    </AppScreen>
  );
};
