import { FC, useCallback, useMemo } from 'react';
import {
  AppIcon,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
} from '@app/components';
import Clipboard from '@react-native-clipboard/clipboard';

import QRCode from 'react-native-qrcode-svg';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types.ts';
import { WalletRoute } from '@app/features/wallet/navigation/constants.ts';
import { useAppTheme } from '@app/theme';
import { useAppToast } from '@app/components/AppToast/useAppToast.ts';
import { AppIconName } from '@app/components/AppIcon/types.ts';

export const DepositDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.DepositDetails>>();
  const { colors } = useAppTheme();
  const { goBack } = useNavigation<NavigationProp<WalletParamList>>();

  const { showSuccess } = useAppToast();

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(item?.address ?? '');
    showSuccess('Copied to clipboard');
  }, [item?.address, showSuccess]);

  const itemsList: {
    title: string;
    value: string;
    icon: AppIconName;
    onPress: () => void;
  }[] = useMemo(
    () => [
      {
        title: 'Network',
        value: item?.network.name ?? '',
        icon: 'Switch',
        onPress: goBack,
      },
      {
        title: 'Deposit address',
        value: item?.address ?? '',
        icon: 'Copy',
        onPress: copyToClipboard,
      },
    ],
    [copyToClipboard, item?.address, item?.network.name, goBack],
  );

  return (
    <AppScreen title={`Deposit ${item?.cryptoAsset.symbol}`} noScroll>
      <AppView
        minHeight={150}
        minWidth={150}
        borderRadius={8}
        alignSelf={'center'}
        backgroundColor={colors.white}
        marginVertical={20}
        padding={10}>
        {item?.address && (
          <QRCode
            ecl={'H'}
            logo={item?.cryptoAsset.image}
            logoSize={30}
            size={150}
            value={item?.address}
            logoMargin={0}
            logoBackgroundColor={colors.black}
          />
        )}
      </AppView>
      <AppView
        width={'100%'}
        backgroundColor={colors.primaryLightColor}
        paddingHorizontal={15}
        borderRadius={8}>
        <AppView gap={1} backgroundColor={colors.inputBorderColor}>
          {itemsList.map(element => (
            <AppView
              key={element.value}
              backgroundColor={colors.primaryLightColor}
              paddingVertical={15}
              justifyContent={'space-between'}
              alignItems={'center'}
              flexDirection={'row'}>
              <AppView width={'80%'} justifyContent={'space-between'}>
                <AppText
                  textStyle={'regular_12_18'}
                  color={colors.inputLabelColor}>
                  {element.title}
                </AppText>
                <AppText textStyle={'regular_14_20'}>{element.value}</AppText>
              </AppView>
              <AppTouchable
                borderWidth={1}
                borderColor={colors.buttonPrimary}
                borderRadius={8}
                padding={5}
                onPress={element.onPress}>
                <AppIcon height={24} name={element.icon} color={'white'} />
              </AppTouchable>
            </AppView>
          ))}
        </AppView>
      </AppView>
      <AppView
        marginTop={15}
        marginBottom={10}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        <AppText color={colors.inputLabelColor} textStyle={'regular_12_18'}>
          Minimum deposit
        </AppText>
        <AppText
          textStyle={
            'regular_12_18'
          }>{`>0.01 ${item?.cryptoAsset.symbol}`}</AppText>
      </AppView>
      <AppText color={colors.inputErrorColor}>
        *Do not transact with Sanctioned Entities
      </AppText>
      <AppText color={colors.inputErrorColor}>
        *Don’t sent NFTs to this address
      </AppText>
    </AppScreen>
  );
};
