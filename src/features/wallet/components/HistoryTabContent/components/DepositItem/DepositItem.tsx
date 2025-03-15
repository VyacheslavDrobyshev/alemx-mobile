import { FC } from 'react';
import { DepositTransaction } from '@app/features/wallet/redux/types.ts';
import { AppIcon, AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { formatNumber } from '@app/utils/number.ts';

export const DepositItem: FC<{ item: DepositTransaction }> = ({ item }) => {
  const { colors } = useAppTheme();

  return (
    <AppTouchable
      backgroundColor={colors.primaryLightColor}
      height={64}
      flex={1}
      marginBottom={10}
      padding={10}
      borderRadius={8}
      borderWidth={1}
      flexDirection={'row'}
      alignItems={'center'}
      borderColor={colors.inputBorderColor}>
      <AppIcon
        marginRight={10}
        name={'ArrowDown'}
        color={colors.inputLabelColor}
      />
      <AppView flex={1}>
        <AppView flexDirection={'row'}>
          <AppText textStyle={'medium_14_20'}>Receive</AppText>
          <AppView
            alignSelf={'center'}
            marginHorizontal={5}
            height={4}
            width={4}
            borderRadius={4}
            backgroundColor={colors.inputItemColor}
          />
          <AppText textStyle={'medium_14_20'}>Crypto</AppText>
        </AppView>
        <AppText
          ellipsizeMode={'middle'}
          width={100}
          numberOfLines={1}
          textStyle={'regular_12_18'}>
          <AppText color={colors.inputLabelColor}>From</AppText>{' '}
          <AppText color={colors.inputLabelColor}>djbsdnkniufids</AppText>
          {/*  todo change to value from BE*/}
        </AppText>
      </AppView>
      <AppView alignItems={'flex-end'}>
        <AppText textStyle={'medium_14_20'} color={colors.positiveStatus}>
          +{item.amount} {item.crypto_asset?.symbol}
        </AppText>
        <AppText textStyle={'regular_12_18'} color={colors.inputLabelColor}>
          ={formatNumber(item.amount_usd ?? 0, 'currency')}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
