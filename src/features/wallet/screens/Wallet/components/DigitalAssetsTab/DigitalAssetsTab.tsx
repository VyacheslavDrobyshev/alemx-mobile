import { AppView } from '@app/components';
import { AccountValue } from '@app/features/wallet/screens/Wallet/components/AccountValue/AccountValue.tsx';

export const DigitalAssetsTab = () => {
  return (
    <AppView flex={1}>
      <AccountValue />
    </AppView>
  );
};
