import { FC } from 'react';
import { Text } from 'react-native';
import { AppScreen, AppView } from '@app/components';

import { AppTab } from '@app/components/AppTab/AppTab';

const tabs = ['Digital assets', 'Bank cards'];

export const WithdrawScreen: FC = () => {
  return (
    <AppScreen title={'Withdraw'} noScroll>
      <AppTab tabs={tabs}>
        <AppView flex={1} justifyContent="center" alignItems="center">
          <Text>Wallet Screen</Text>
        </AppView>
        <AppView flex={1} justifyContent="center" alignItems="center">
          <Text>Card Screen</Text>
        </AppView>
      </AppTab>
    </AppScreen>
  );
};
