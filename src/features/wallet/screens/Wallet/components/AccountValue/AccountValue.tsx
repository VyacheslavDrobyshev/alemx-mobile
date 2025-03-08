import {
  AppText,
  AppTouchable,
  AppView,
  useAppBottomDrawer,
} from '@app/components';
import { useAppTheme } from '@app/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { accountValueButtonsList } from '@app/features/wallet/screens/Wallet/components/AccountValue/constants.tsx';
import { useSelector } from 'react-redux';
import { selectUnifiedBalance } from '@app/features/wallet/screens/Wallet/redux/selectors.ts';
import { formatNumber } from '@app/utils/number.ts';
import { useCallback, useMemo } from 'react';
import { SelectMethodModalContent } from '@app/features/wallet/modals/SelectMethodModalContent/SelectMethodModalContent.tsx';
import { AccountValueButtonsId } from '@app/features/wallet/screens/Wallet/components/AccountValue/types.ts';
import { SelectMethodModalItem } from '@app/features/wallet/modals/SelectMethodModalContent/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';

export const AccountValue = () => {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  const unifiedBalance = useSelector(selectUnifiedBalance);
  const { openBottomDrawer } = useAppBottomDrawer();

  const assetsCount = useMemo(
    () => Object.values(unifiedBalance?.balancesByAsset ?? {}).length,
    [unifiedBalance?.balancesByAsset],
  );

  const onTransfer = useCallback(
    ({ title, items }: { title: string; items: SelectMethodModalItem[] }) => {
      openBottomDrawer({
        body: <SelectMethodModalContent items={items} />,
        closeOnBackdropPress: true,
        title: title,
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
                action: () => navigate(MainRoute.Deposit),
              },
              {
                icon: 'Money',
                title: 'Fiat',
                subtitle:
                  'Deposit cash to your wallet with bank transfer or using a credit card.',
                action: () => {},
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
                action: () => navigate(MainRoute.Withdraw),
              },
              {
                icon: 'Money',
                title: 'Credit card',
                subtitle:
                  'Withdraw cash to any credit card from any bank in the world.',
                action: () => {},
              },
              {
                icon: 'Transfer',
                title: 'Transfer',
                subtitle: 'Send crypto through username to another ALEMX user.',
                action: () => {},
              },
            ],
          });
          break;
        case AccountValueButtonsId.Buy:
          break;
        case AccountValueButtonsId.History:
          navigate(MainRoute.History);
          break;
        case AccountValueButtonsId.Swap:
          navigate(MainRoute.History);
          break;
        default:
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
      overflow={'hidden'}
      width={'100%'}>
      <AppView paddingHorizontal={15} flex={1}>
        <AppView
          flex={1}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <AppText textStyle={'regular_12_18'} color={colors.inputLabelColor}>
            VOLUME
          </AppText>
          <AppText
            textStyle={'regular_12_18'}
            color={colors.inputLabelColor}>{`${assetsCount} ASSETS`}</AppText>
        </AppView>
        <AppView justifyContent={'center'} flex={1}>
          <AppText textStyle={'medium_26_32'}>
            {formatNumber(unifiedBalance?.totalBalanceUsd ?? 0, 'currency')}
          </AppText>
        </AppView>
      </AppView>
      <AppView
        borderTopWidth={1}
        borderTopColor={colors.inputBorderColor}
        flexDirection={'row'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        height={68}>
        {accountValueButtonsList.map(({ button, title, id }) => (
          <AppTouchable
            onPress={() => onPressHandler(id)}
            flex={1}
            alignItems={'center'}
            key={title}>
            {button}
            <AppText>{title}</AppText>
          </AppTouchable>
        ))}
      </AppView>
    </AppView>
  );
};
