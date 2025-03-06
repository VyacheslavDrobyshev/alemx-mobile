import { FC, useCallback } from 'react';
import { Text } from 'react-native';
import { AppScreen } from '@app/components';
import { AppButton } from '@app/components/AppButton/AppButton.tsx';
import { useAppDispatch } from '@app/redux';
import { logoutThunk } from '@app/features/auth/redux/thunks.ts';

export const WalletScreen: FC = () => {
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return (
    <AppScreen>
      <Text>Wallet</Text>
      <AppButton title={'Logout'} onPress={onLogout} />
    </AppScreen>
  );
};
