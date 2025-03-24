import { AppImage } from '@app/components/AppImage/AppImage';
import { AppText, AppView } from '@app/components';
import { formatNumber } from '@app/utils/number';
import { FC } from 'react';
import { useAppTheme } from '@app/theme';
import { WalletAssetWithBalance } from '@app/features/wallet/components/BalancesList/BalancesList';

export const NetworkItem: FC<{ item: WalletAssetWithBalance }> = ({ item }) => {
  const { colors } = useAppTheme();
  return (
    <AppView flexDirection="row">
      {item.network.image ? (
        <AppImage
          width={15}
          height={15}
          uri={item.network.image}
          marginRight={10}
          marginTop={3}
        />
      ) : (
        <AppView
          alignItems="center"
          justifyContent="center"
          height={15}
          width={15}
          borderRadius={15}
          marginRight={10}
          marginTop={3}
          backgroundColor={colors.buttonPrimary}>
          <AppText textStyle="regular_8_16">
            {item.network.nativeAssetSymbol.slice(0, 2)}
          </AppText>
        </AppView>
      )}

      <AppView flex={1}>
        <AppText>{item.network.name}</AppText>
        <AppText color={colors.inputLabelColor}>
          ({item.network.nativeAssetSymbol})
        </AppText>
      </AppView>
      <AppView alignItems="flex-end" flex={1}>
        <AppText>
          {formatNumber(
            Number(item?.balance ?? 0),
            undefined,
            2,
            item.decimals ?? 2,
          )}
        </AppText>
        <AppText color={colors.inputLabelColor}>
          {formatNumber(
            Number(item?.balanceUsd ?? 0),
            'currency',
            2,
            item.decimals ?? 2,
          )}
        </AppText>
      </AppView>
    </AppView>
  );
};
