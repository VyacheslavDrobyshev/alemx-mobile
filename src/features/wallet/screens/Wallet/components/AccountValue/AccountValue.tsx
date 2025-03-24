import {
  AppText,
  AppTouchable,
  AppView,
  useAppBottomDrawer,
} from '@app/components';
import { useAppTheme } from '@app/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import { accountValueButtonsList } from '@app/features/wallet/screens/Wallet/components/AccountValue/constants';
import { useSelector } from 'react-redux';
import {
  selectIsUnifiedBalanceLoading,
  selectUnifiedBalance,
} from '@app/features/wallet/redux/selectors';
import { formatNumber } from '@app/utils/number';
import { useCallback, useMemo } from 'react';
import { SelectMethodModalContent } from '@app/features/wallet/modals/SelectMethodModalContent/SelectMethodModalContent';
import { AccountValueButtonsId } from '@app/features/wallet/screens/Wallet/components/AccountValue/types';
import { SelectMethodModalItem } from '@app/features/wallet/modals/SelectMethodModalContent/types';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import { AppActivityIndicator } from '@app/components/AppActivityIndicator/AppActivityIndicator';

export function AccountValue() {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const unifiedBalance = useSelector(selectUnifiedBalance);
  const isUnifiedBalanceLoading = useSelector(selectIsUnifiedBalanceLoading);
  const { openBottomDrawer } = useAppBottomDrawer();

  const assetsCount = useMemo(
    () =>
      Object.values(unifiedBalance?.balancesByAsset ?? {}).filter(
        el => Number(el.balance) > 0,
      ).length,
    [unifiedBalance?.balancesByAsset],
  );

  const onTransfer = useCallback(
    ({ title, items }: { title: string; items: SelectMethodModalItem[] }) => {
      openBottomDrawer({
        body: <SelectMethodModalContent items={items} />,
        closeOnBackdropPress: true,
        title,
      });
    },
    [openBottomDrawer],
  );

  const onPressHandler = useCallback(
    (id: AccountValueButtonsId) => {
      switch (id) {
        case AccountValueButtonsId.Deposit:
          onTransfer({
            title: 'Select withdraw method',
            items: [
              {
                icon: 'Dollar',
                title: 'Crypto',
                subtitle:
                  'Deposit crypto to your wallet from another on-chain wallet or exchange',
                action: () => navigate(WalletRoute.Deposit),
              },
              {
                icon: 'Money',
                title: 'Fiat',
                subtitle:
                  'Deposit cash to your wallet with bank transfer or using a credit card.',
                action: () => navigate(WalletRoute.Deposit),
              },
            ],
          });
          break;
        case AccountValueButtonsId.Withdraw:
          onTransfer({
            title: 'Choose type of deposit',
            items: [
              {
                icon: 'Dollar',
                title: 'Crypto',
                subtitle:
                  'Withdraw crypto to a wallet, exchange, or ALEMX address',
                action: () => navigate(WalletRoute.Withdraw),
              },
              {
                icon: 'Money',
                title: 'Credit card',
                subtitle:
                  'Withdraw cash to any credit card from any bank in the world.',
                action: () => navigate(WalletRoute.Deposit),
              },
              {
                icon: 'Transfer',
                title: 'Transfer',
                subtitle: 'Send crypto through username to another ALEMX user.',
                action: () => navigate(WalletRoute.TransferUser),
              },
            ],
          });
          break;
        case AccountValueButtonsId.Buy:
          break;
        case AccountValueButtonsId.History:
          navigate(WalletRoute.History);
          break;
        case AccountValueButtonsId.Swap:
          navigate(WalletRoute.History);
          break;
        default:
          const _: never = id;
          break;
      }
    },
    [navigate, onTransfer],
  );

  return (
    <AppView
      backgroundColor={colors.primaryLightColor}
      borderRadius={8}
      height={173}
      borderWidth={1}
      borderColor={colors.inputBorderColor}
      overflow="hidden"
      width="100%">
      <AppView paddingHorizontal={15} flex={1}>
        <AppView
          flex={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <AppText textStyle="regular_12_18" color={colors.inputLabelColor}>
            VOLUME
          </AppText>
          {isUnifiedBalanceLoading ? (
            <AppActivityIndicator size="small" absoluteFill />
          ) : (
            <AppText
              textStyle="regular_12_18"
              color={colors.inputLabelColor}>{`${assetsCount} ASSET${
              assetsCount > 1 ? 'S' : ''
            }`}</AppText>
          )}
        </AppView>
        <AppView justifyContent="center" flex={1}>
          <AppText textStyle="medium_26_32">
            {isUnifiedBalanceLoading ? (
              <AppActivityIndicator size="small" absoluteFill />
            ) : (
              formatNumber(
                unifiedBalance?.totalBalanceUsd ?? 0,
                'currency',
                2,
                2,
              )
            )}
          </AppText>
        </AppView>
      </AppView>
      <AppView
        borderTopWidth={1}
        borderTopColor={colors.inputBorderColor}
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        height={68}>
        {accountValueButtonsList.map(({ Button, title, id }) => (
          <AppTouchable
            disabled={
              id === AccountValueButtonsId.Withdraw &&
              !unifiedBalance?.totalBalanceUsd
            }
            onPress={() => onPressHandler(id)}
            flex={1}
            alignItems="center"
            key={title}>
            <Button
              color={
                id === AccountValueButtonsId.Withdraw &&
                !unifiedBalance?.totalBalanceUsd
                  ? colors.inputItemColor
                  : colors.white
              }
            />
            <AppText
              color={
                id === AccountValueButtonsId.Withdraw &&
                !unifiedBalance?.totalBalanceUsd
                  ? colors.inputItemColor
                  : colors.white
              }>
              {title}
            </AppText>
          </AppTouchable>
        ))}
      </AppView>
    </AppView>
  );
}
