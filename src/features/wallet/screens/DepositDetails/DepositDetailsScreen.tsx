import { FC, useCallback, useMemo, useState } from 'react';
import {
  AppIcon,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
  useAppBottomDrawer,
} from '@app/components';
import Clipboard from '@react-native-clipboard/clipboard';

import QRCode from 'react-native-qrcode-svg';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import { useAppTheme } from '@app/theme';
import { useAppToast } from '@app/components/AppToast/useAppToast.ts';
import { NetworksModalContent } from '@app/features/wallet/modals/NetworksModalContent/NetworksModalContent.tsx';
import { AppIconName } from '@app/components/AppIcon/types.ts';

const data = 'djbhfsjfsdhfhhfsd7f9s8d7f9s8d789f78s9d7fs89df798sf';

export const DepositDetailsScreen: FC = () => {
  const {
    params: { item, network: initialNetwork },
  } = useRoute<RouteProp<MainParamList, MainRoute.DepositDetails>>();
  const { colors } = useAppTheme();
  const { openBottomDrawer } = useAppBottomDrawer();

  const [network, setNetwork] = useState(initialNetwork);
  const { showSuccess } = useAppToast();

  const onNetworkChange = useCallback(
    (ntw: string) => {
      setNetwork(ntw);
    },
    [setNetwork],
  );

  const onChangeNetwork = useCallback(() => {
    openBottomDrawer({
      body: <NetworksModalContent onPress={onNetworkChange} />,
      closeOnBackdropPress: true,
      title: 'Choose network',
    });
  }, [onNetworkChange, openBottomDrawer]);

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(data);
    showSuccess('Copied to clipboard');
  }, [showSuccess]);

  const itemsList: {
    title: string;
    value: string;
    icon: AppIconName;
    onPress: () => void;
  }[] = useMemo(
    () => [
      {
        title: 'Network',
        value: network,
        icon: 'Switch',
        onPress: onChangeNetwork,
      },
      {
        title: 'Deposit address',
        value: data,
        icon: 'Copy',
        onPress: copyToClipboard,
      },
    ],
    [copyToClipboard, network, onChangeNetwork],
  );

  return (
    <AppScreen title={`Deposit ${item?.symbol}`} noScroll>
      <AppView
        borderRadius={8}
        width={'auto'}
        alignSelf={'center'}
        backgroundColor={colors.white}
        marginVertical={20}
        padding={10}>
        <QRCode
          ecl={'H'}
          logo={item?.image}
          logoSize={30}
          size={150}
          value={data}
          logoMargin={0}
          logoBackgroundColor={colors.black}
        />
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
        <AppText textStyle={'regular_12_18'}>{`>0.01 ${item?.symbol}`}</AppText>
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
