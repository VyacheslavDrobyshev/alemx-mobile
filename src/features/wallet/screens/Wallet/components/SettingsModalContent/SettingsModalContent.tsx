import { useAppDispatch } from '@app/redux';
import { useSelector } from 'react-redux';
import { selectWalletSettings } from '@app/features/wallet/screens/Wallet/redux/selectors.ts';
import { useAppTheme } from '@app/theme';
import { useCallback, useState } from 'react';
import { WalletSettings } from '@app/features/wallet/screens/Wallet/redux/types.ts';
import { updateWalletSettings } from '@app/features/wallet/screens/Wallet/redux';
import { AppText, AppView, useAppBottomDrawer } from '@app/components';
import { AppCheckBox } from '@app/components/AppCheckBox/AppCheckBox.tsx';
import { AppButton } from '@app/components/AppButton/AppButton.tsx';

export const SettingsModalContent = () => {
  const dispatch = useAppDispatch();
  const walletSettings = useSelector(selectWalletSettings);
  const { colors } = useAppTheme();
  const { closeBottomDrawer } = useAppBottomDrawer();

  const [settings, setSettings] = useState<WalletSettings[]>(walletSettings);

  const toggleSetting = useCallback((id: number) => {
    setSettings(prev =>
      prev.map((setting, index) =>
        index === id ? { ...setting, isChecked: !setting.isChecked } : setting,
      ),
    );
  }, []);

  const onConfirm = useCallback(() => {
    dispatch(updateWalletSettings(settings));
    closeBottomDrawer();
  }, [closeBottomDrawer, dispatch, settings]);

  return (
    <>
      <AppView
        marginBottom={30}
        backgroundColor={colors.inputBorderColor}
        gap={1}
        justifyContent={'space-between'}>
        {settings.map((item, index) => (
          <AppView
            key={item.title}
            paddingVertical={10}
            width={'100%'}
            flexDirection={'row'}
            alignItems={'flex-start'}
            backgroundColor={colors.primaryLightColor}>
            <AppView marginTop={3}>
              <AppCheckBox
                value={item.isChecked}
                onPress={() => toggleSetting(index)}
              />
            </AppView>
            <AppView gap={5} flex={1}>
              <AppText textStyle={'medium_14_20'}>{item.title}</AppText>
              <AppText
                color={colors.inputLabelColor}
                textStyle={'regular_14_20'}>
                {item.subTitle}
              </AppText>
            </AppView>
          </AppView>
        ))}
      </AppView>
      <AppButton onPress={onConfirm} title={'CONFIRM'} />
    </>
  );
};
