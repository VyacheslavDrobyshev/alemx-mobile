import { AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { AssetBalance } from '@app/features/wallet/screens/Wallet/redux/types.ts';
import { useSelector } from 'react-redux';
import { selectUnifiedBalance } from '@app/features/wallet/screens/Wallet/redux/selectors.ts';
import { formatNumber } from '@app/utils/number.ts';

export const CryptoCurrencyItem = ({ item }: { item: AssetBalance }) => {
  const {
    colors,
    cryptoCurrencyList: { secondaryTextColor, itemContainer, icon },
  } = useAppTheme();

  const unifiedBalance = useSelector(selectUnifiedBalance);

  console.log(unifiedBalance?.balancesByAsset);

  return (
    <AppTouchable
      borderWidth={itemContainer.borderWidth}
      borderColor={itemContainer.borderColor}
      borderRadius={itemContainer.borderRadius}
      marginBottom={itemContainer.marginBottom}
      height={itemContainer.height}
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={itemContainer.paddingHorizontal}
      backgroundColor={colors.primaryLightColor}>
      <AppView
        height={icon.height}
        width={icon.width}
        borderRadius={icon.borderRadius}
        backgroundColor={colors.white}
        marginRight={icon.marginRight}
      />
      <AppView flex={1}>
        <AppView flexDirection={'row'} justifyContent={'space-between'}>
          <AppText textStyle={'medium_14_20'}>{item.assetSymbol}</AppText>
          <AppText textStyle={'medium_14_20'}>
            {formatNumber(item.balance)}
          </AppText>
        </AppView>
        <AppView flexDirection={'row'} justifyContent={'space-between'}>
          <AppText textStyle={'regular_12_18'}>{item.assetName}</AppText>
          <AppText textStyle={'regular_12_18'} color={secondaryTextColor.color}>
            {formatNumber(item.balanceUsd, 'currency')}
          </AppText>
        </AppView>
      </AppView>
      <AppView />
    </AppTouchable>
  );
};
