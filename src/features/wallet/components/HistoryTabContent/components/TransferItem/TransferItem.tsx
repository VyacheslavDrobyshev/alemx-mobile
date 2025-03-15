import { FC } from 'react';
import { TransferTransaction } from '@app/features/wallet/redux/types.ts';
import { AppIcon, AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { capitalizeFirstLetter } from '@app/utils/common.ts';
import { formatNumber } from '@app/utils/number.ts';

export const TransferItem: FC<{ item: TransferTransaction }> = ({ item }) => {
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
        name={'TransferTop'}
        color={colors.inputLabelColor}
      />
      <AppView flex={1}>
        <AppText textStyle={'medium_14_20'}>
          {capitalizeFirstLetter(item.transaction_type)}
        </AppText>
        <AppText textStyle={'regular_12_18'}>
          <AppText color={colors.inputLabelColor}>To</AppText>{' '}
          {item.receiver_user.username}
        </AppText>
      </AppView>
      <AppView alignItems={'flex-end'}>
        <AppText textStyle={'medium_14_20'} color={colors.negativeStatus}>
          -{item.amount} {item.crypto_asset.symbol}
        </AppText>
        <AppText textStyle={'regular_12_18'} color={colors.inputLabelColor}>
          ={formatNumber(item.amount_usd, 'currency')}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
