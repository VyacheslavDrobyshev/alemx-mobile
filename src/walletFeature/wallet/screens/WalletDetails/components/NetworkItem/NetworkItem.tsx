import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';
import { AppText, AppView } from '@app/walletFeature/wallet/common/components';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';
import { FC } from 'react';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { UnifiedBalanceNetwork } from '@app/walletFeature/wallet/redux/types';

export const NetworkItem: FC<{ networks: UnifiedBalanceNetwork[] }> = ({
  networks,
}) => {
  const { colors } = useAppTheme();

  return (
    <AppView gap={10}>
      {networks
        .filter(element => Number(element.totalBalanceByNetwork.balanceUsd) > 0)
        .map(element => (
          <AppView flexDirection="row" key={element.network.id}>
            {element.network.image ? (
              <AppImage
                width={15}
                height={15}
                uri={element.network.image}
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
                  {element.network.nativeAssetSymbol.slice(0, 2)}
                </AppText>
              </AppView>
            )}

            <AppView flex={1}>
              <AppText>{element.network.name}</AppText>
              <AppText color={colors.inputLabelColor}>
                ({element.network.nativeAssetSymbol})
              </AppText>
            </AppView>
            <AppView alignItems="flex-end" flex={1}>
              <AppText>
                {formatNumber(
                  Number(element?.totalBalanceByNetwork.balance ?? 0),
                  undefined,
                  2,
                  element.asset.decimals,
                )}
              </AppText>
              <AppText color={colors.inputLabelColor}>
                {formatNumber(
                  Number(element.totalBalanceByNetwork.balanceUsd ?? 0),
                  'currency',
                  2,
                  element.asset.decimals,
                )}
              </AppText>
            </AppView>
          </AppView>
        ))}
    </AppView>
  );
};
