import { FC } from 'react';
import { Text } from 'react-native';
import { AppScreen, AppView } from '@app/components';

import { AppTab } from '@app/components/AppTab/AppTab';

const tabs = ['Deposit', 'Withdraw', 'Transfer', 'Exchange'];

export const HistoryScreen: FC = () => {
  return (
    <AppScreen title={'History'} noScroll>
      <AppTab tabs={tabs}>
        <AppView flex={1} justifyContent="center" alignItems="center">
          <Text>Deposit Screen</Text>
        </AppView>
        <AppView flex={1} justifyContent="center" alignItems="center">
          <Text>Withdraw Screen</Text>
        </AppView>
        <AppView flex={1} justifyContent="center" alignItems="center">
          <Text>Transfer Screen</Text>
        </AppView>
        <AppView flex={1} justifyContent="center" alignItems="center">
          <Text>Exchange Screen</Text>
        </AppView>
      </AppTab>
    </AppScreen>
  );
};
