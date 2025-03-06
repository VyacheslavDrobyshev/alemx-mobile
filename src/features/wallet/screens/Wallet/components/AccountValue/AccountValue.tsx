import { AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { accountValueButtonsList } from '@app/features/wallet/screens/Wallet/components/AccountValue/constants.tsx';

export const AccountValue = () => {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  return (
    <AppView
      backgroundColor={colors.primaryLightColor}
      borderRadius={8}
      height={173}
      borderWidth={1}
      borderColor={colors.inputBorderColor}
      overflow={'hidden'}
      width={'100%'}>
      <AppView flex={1} />
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
