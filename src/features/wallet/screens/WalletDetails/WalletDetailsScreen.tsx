import { FC } from 'react';
import { AppScreen, AppText, AppView } from '@app/components';
import { AppTab } from '@app/components/AppTab/AppTab.tsx';
import { transactionHistoryTabs } from '@app/features/wallet/screens/WalletDetails/constants.ts';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import { useAppTheme } from '@app/theme';
import { formatNumber } from '@app/utils/number.ts';
import { AppImage } from '@app/components/AppImage/AppImage.tsx';
import { NetworkItem } from '@app/features/wallet/screens/WalletDetails/components/NetworkItem/NetworkItem.tsx';

export const WalletDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<MainParamList, MainRoute.WalletDetails>>();

  const { colors } = useAppTheme();
  return (
    <AppScreen title={item?.cryptoAsset.symbol}>
      <AppView
        height={100}
        marginVertical={20}
        alignItems={'center'}
        justifyContent={'space-between'}>
        {item?.cryptoAsset.image ? (
          <AppImage width={30} height={30} uri={item?.cryptoAsset.image} />
        ) : (
          <AppView
            alignItems={'center'}
            justifyContent={'center'}
            height={30}
            width={30}
            borderRadius={30}
            backgroundColor={colors.buttonPrimary}>
            <AppText textStyle={'medium_14_20'}>
              {item?.cryptoAsset.name.slice(0, 2)}
            </AppText>
          </AppView>
        )}

        <AppText textStyle={'medium_26_32'}>{`${formatNumber(
          Number(item.balancesByAsset?.balance ?? 0),
        )} ${item?.cryptoAsset.symbol}`}</AppText>
        <AppText
          color={colors.inputLabelColor}
          textStyle={'regular_12_18'}>{`${formatNumber(
          Number(item.balancesByAsset?.balanceUsd ?? 0),
          'currency',
        )}`}</AppText>
      </AppView>
      <AppView
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor={colors.inputBorderColor}
        paddingVertical={20}
        gap={10}>
        <NetworkItem item={item} />
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
