import { AppIcon, AppText, AppTouchable, AppView } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@app/theme';
import { useAppDispatch } from '@app/redux';
import { FC, useCallback } from 'react';
import { logoutThunk } from '@app/features/auth/redux/thunks.ts';
import { AppScreenProps } from '@app/components/AppScreen/components/types.ts';
import storage from 'react-native-encrypted-storage';

export const HeaderComponent: FC<AppScreenProps> = ({ title }) => {
  const { canGoBack, goBack } = useNavigation();
  const { colors } = useAppTheme();

  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return (
    <AppView
      height={50}
      width={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingHorizontal={20}
      backgroundColor={colors.primary}>
      <AppTouchable
        disabled={!canGoBack()}
        onPress={goBack}
        flexDirection={'row'}
        alignItems={'center'}>
        {canGoBack() && (
          <AppIcon marginRight={5} name={'ArrowLeft'} color={colors.white} />
        )}
        {!!title && <AppText textStyle={'regular_16_20'}>{title}</AppText>}
      </AppTouchable>
      <AppText onPress={onLogout} textStyle={'regular_16_20'}>
        Logout
      </AppText>
      <AppText onPress={storage.clear} textStyle={'regular_16_20'}>
        Clear storage
      </AppText>
    </AppView>
  );
};
