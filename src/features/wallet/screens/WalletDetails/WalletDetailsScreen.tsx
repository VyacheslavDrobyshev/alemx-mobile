import { FC, useMemo } from 'react';
import { AppScreen, AppText, AppView } from '@app/components';
import { AppTab } from '@app/components/AppTab/AppTab.tsx';
import { transactionHistoryTabs } from '@app/features/wallet/screens/WalletDetails/constants.ts';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import { useAppTheme } from '@app/theme';
import { formatNumber } from '@app/utils/number.ts';
import { AppImage } from '@app/components/AppImage/AppImage.tsx';

export const WalletDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<MainParamList, MainRoute.WalletDetails>>();

  const networks = useMemo(() => {
    return [
      { name: 'TRON', symbol: 'TRC20', icon: item?.image, balance: 0 },
      { name: 'TRON', symbol: 'TRC20', icon: item?.image, balance: 0 },
      { name: 'TRON', symbol: 'TRC20', icon: item?.image, balance: 0 },
    ];
  }, [item?.image]);

  const { colors } = useAppTheme();
  return (
    <AppScreen title={item?.symbol}>
      <AppView
        height={100}
        marginVertical={20}
        alignItems={'center'}
        justifyContent={'space-between'}>
        {item?.image ? (
          <AppImage width={30} height={30} uri={item?.image} />
        ) : (
          <AppView
            alignItems={'center'}
            justifyContent={'center'}
            height={30}
            width={30}
            borderRadius={30}
            backgroundColor={colors.buttonPrimary}>
            <AppText textStyle={'medium_14_20'}>
              {item?.name.slice(0, 2)}
            </AppText>
          </AppView>
        )}

        <AppText textStyle={'medium_26_32'}>{`${formatNumber(33456)} ${
          item?.symbol
        }`}</AppText>
        <AppText
          color={colors.inputLabelColor}
          textStyle={'regular_12_18'}>{`${formatNumber(
          33456,
          'currency',
        )}`}</AppText>
      </AppView>
      <AppView
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor={colors.inputBorderColor}
        paddingVertical={20}
        gap={10}>
        {networks.map(({ icon, name, balance, symbol }) => (
          <AppView flexDirection={'row'}>
            {icon ? (
              <AppImage
                width={15}
                height={15}
                uri={icon}
                marginRight={10}
                marginTop={3}
              />
            ) : null}

            <AppView flex={1}>
              <AppText>{name}</AppText>
              <AppText color={colors.inputLabelColor}>{symbol}</AppText>
            </AppView>
            <AppView alignItems={'flex-end'} flex={1}>
              <AppText>{formatNumber(balance)}</AppText>
              <AppText color={colors.inputLabelColor}>
                {formatNumber(balance, 'currency')}
              </AppText>
            </AppView>
          </AppView>
        ))}
      </AppView>
      <AppView>
        <AppText marginTop={10} textStyle={'medium_16_24'}>
          Transaction history
        </AppText>
        <AppTab tabs={transactionHistoryTabs}>
          <AppView>
            <AppText>Deposits</AppText>
          </AppView>
          <AppView>
            <AppText>Withdrawals</AppText>
          </AppView>
          <AppView>
            <AppText>Transfers</AppText>
          </AppView>
          <AppView>
            <AppText>Exchanges</AppText>
          </AppView>
        </AppTab>
      </AppView>
    </AppScreen>
  );
};
