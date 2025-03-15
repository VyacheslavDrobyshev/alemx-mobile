import { FC } from 'react';
import { AppScreen, AppText, AppView } from '@app/components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types.ts';
import { WalletRoute } from '@app/features/wallet/navigation/constants.ts';
import { useAppTheme } from '@app/theme';

export const TransactionDetailsScreen: FC = () => {
  const {
    params: { rows, title, header },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.TransactionDetails>>();
  const { colors } = useAppTheme();
  return (
    <AppScreen title={title}>
      {header}
      <AppView
        paddingHorizontal={15}
        borderRadius={8}
        borderWidth={1}
        borderColor={colors.inputBorderColor}
        width={'100%'}
        backgroundColor={colors.primaryLightColor}>
        {Object.entries(rows).map((el, index) => {
          return (
            <AppView
              key={el[0]}
              justifyContent={'space-between'}
              paddingVertical={15}
              flexDirection={'row'}
              borderTopWidth={index ? 1 : 0}
              borderColor={colors.inputBorderColor}>
              <AppText color={colors.inputLabelColor}>{el[0]}</AppText>
              <AppText
                ellipsizeMode={'middle'}
                maxWidth={'60%'}
                flexShrink={1}
                numberOfLines={1}
                textStyle={'medium_14_20'}>
                {el[1]}
              </AppText>
            </AppView>
          );
        })}
      </AppView>
    </AppScreen>
  );
};
