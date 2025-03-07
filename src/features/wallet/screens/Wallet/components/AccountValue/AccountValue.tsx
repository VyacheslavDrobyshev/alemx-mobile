import { AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { accountValueButtonsList } from '@app/features/wallet/screens/Wallet/components/AccountValue/constants.tsx';
import { useSelector } from 'react-redux';
import { selectUnifiedBalance } from '@app/features/wallet/screens/Wallet/redux/selectors.ts';
import { formatNumber } from '@app/utils/number.ts';
import { useMemo } from 'react';

export const AccountValue = () => {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  const unifiedBalance = useSelector(selectUnifiedBalance);

  const assetsCount = useMemo(
    () => Object.values(unifiedBalance?.balancesByAsset ?? {}).length,
    [unifiedBalance?.balancesByAsset],
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
        {accountValueButtonsList.map(({ button, title, route }) => (
          <AppTouchable
            onPress={() => navigate(route)}
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
