import { AppText, AppTouchable, AppView } from '@app/components';
import { FC } from 'react';
import { useAppTheme } from '@app/theme';

import { formatNumber } from '@app/utils/number.ts';
import { AppImage } from '@app/components/AppImage/AppImage.tsx';
import { ModifiedWallet } from '@app/features/wallet/screens/Wallet/components/WalletsList/WalletsList.tsx';
import { NetworkItem } from '@app/features/wallet/screens/WalletDetails/components/NetworkItem/NetworkItem.tsx';

export const WalletItem: FC<{
  item: ModifiedWallet;
  onPress?: (item: ModifiedWallet) => void;
  showAssets?: boolean;
  hasAssets?: boolean;
}> = ({ item, onPress, showAssets = false, hasAssets }) => {
  const {
    colors,
    cryptoCurrencyList: { secondaryTextColor, itemContainer, icon },
  } = useAppTheme();

  return (
    <AppView
      borderWidth={itemContainer.borderWidth}
      borderColor={itemContainer.borderColor}
      borderRadius={itemContainer.borderRadius}
      marginBottom={itemContainer.marginBottom}
      backgroundColor={colors.primaryLightColor}
      paddingVertical={itemContainer.paddingVertical}
      paddingHorizontal={itemContainer.paddingHorizontal}>
      <AppTouchable
        onPress={() => onPress?.(item)}
        flexDirection={'row'}
        alignItems={'center'}>
        {item.cryptoAsset.image ? (
          <AppImage
            uri={item.cryptoAsset.image}
            height={icon.height}
            width={icon.width}
            marginRight={icon.marginRight}
          />
        ) : (
          <AppView
            alignItems={'center'}
            justifyContent={'center'}
            height={icon.height}
            width={icon.width}
            borderRadius={icon.borderRadius}
            backgroundColor={colors.buttonPrimary}
            marginRight={icon.marginRight}>
            <AppText textStyle={'semi_bold_12_18'}>
              {item.cryptoAsset.symbol.slice(0, 2)}
            </AppText>
          </AppView>
        )}

        <AppView flex={1}>
          <AppView flexDirection={'row'} justifyContent={'space-between'}>
            <AppText textStyle={'medium_14_20'}>
              {item.cryptoAsset.symbol}
            </AppText>
            <AppText textStyle={'medium_14_20'}>
              {formatNumber(Number(item.balancesByAsset?.balance ?? 0))}
            </AppText>
          </AppView>
          <AppView flexDirection={'row'} justifyContent={'space-between'}>
            <AppText textStyle={'regular_12_18'}>
              {item.cryptoAsset.name}
            </AppText>
            <AppText
              textStyle={'regular_12_18'}
              color={secondaryTextColor.color}>
              {formatNumber(
                Number(item.balancesByAsset?.balanceUsd ?? 0),
                'currency',
              )}
            </AppText>
          </AppView>
        </AppView>
        <AppView />
      </AppTouchable>
      {showAssets && hasAssets && (
        <>
          <AppView
            alignSelf={'center'}
            height={1}
            backgroundColor={colors.inputBorderColor}
            width={'100%'}
            marginVertical={15}
          />
          <AppView marginLeft={25}>
            <NetworkItem item={item} />
          </AppView>
        </>
      )}
    </AppView>
  );
};
