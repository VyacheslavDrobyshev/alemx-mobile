import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppIcon,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { useAppToast } from '@app/walletFeature/wallet/common/components/AppToast/useAppToast';
import { AppIconName } from '@app/walletFeature/wallet/common/components/AppIcon/types';
import { getDepositEstimateFeeApi } from '@app/walletFeature/wallet/api';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';
import { AmountValue } from '@app/walletFeature/wallet/components/AmountValue/AmountValue';

export const DepositDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.DepositDetails>>();
  const [depositFee, setDepositFee] = useState('0');
  const [isFeeLoading, setIsFeeLoading] = useState(false);

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
    icon?: AppIconName;
    onPress: () => void;
  }[] = useMemo(
    () => [
      {
        title: 'Network',
        value: item?.network.name ?? '',
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

  useEffect(() => {
    const fetchFee = async () => {
      try {
        setIsFeeLoading(true);
        const data = await getDepositEstimateFeeApi(item.cryptoAsset.id);
        setDepositFee(data.networkFeeConverted);
      } catch (e) {
        /* empty */
      } finally {
        setIsFeeLoading(false);
      }
    };
    void fetchFee();
    const interval = setInterval(fetchFee, 15000);
    return () => clearInterval(interval);
  }, [item.cryptoAsset.id]);

  return (
    <AppScreen title={`Deposit ${item?.cryptoAsset.symbol}`} noScroll>
      <AppView
        minHeight={150}
        minWidth={150}
        borderRadius={8}
        alignSelf="center"
        backgroundColor={colors.white}
        marginVertical={20}
        padding={10}>
        {item?.address && (
          <QRCode
            backgroundColor={colors.white}
            ecl="H"
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
        width="100%"
        backgroundColor={colors.primaryLightColor}
        paddingHorizontal={15}
        borderRadius={8}>
        <AppView gap={1} backgroundColor={colors.inputBorderColor}>
          {itemsList.map(element => (
            <AppView
              key={element.value}
              backgroundColor={colors.primaryLightColor}
              paddingVertical={15}
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row">
              <AppView width="80%" justifyContent="space-between">
                <AppText
                  textStyle="regular_12_18"
                  color={colors.inputLabelColor}>
                  {element.title}
                </AppText>
                <AppText textStyle="regular_14_20">{element.value}</AppText>
              </AppView>
              {!!element.icon && (
                <AppTouchable
                  borderWidth={1}
                  borderColor={colors.buttonPrimary}
                  borderRadius={8}
                  padding={5}
                  onPress={element.onPress}>
                  <AppIcon height={24} name={element.icon} color="white" />
                </AppTouchable>
              )}
            </AppView>
          ))}
        </AppView>
      </AppView>
      <AppView marginVertical={20}>
        <AppText color={colors.inputErrorColor}>
          *Do not transact with Sanctioned Entities
        </AppText>
        <AppText color={colors.inputErrorColor}>
          *Don’t sent NFTs to this address
        </AppText>
      </AppView>

      <AppView justifyContent="flex-end" flex={1} gap={5}>
        <AppView
          flexDirection="row"
          padding={10}
          marginBottom={10}
          backgroundColor={colors.primaryLightColor}
          width="100%"
          borderRadius={12}
          borderWidth={1}
          borderColor={colors.pendingStatus}>
          <AppIcon
            marginRight={10}
            color={colors.inputLabelColor}
            name="Bell"
          />
          <AppText textStyle="regular_12_18" flexShrink={1}>
            Only{' '}
            <AppText textStyle="medium_12_18">
              USDT on the BNB Smart Chain (BEP-20)
            </AppText>{' '}
            is supported.{' '}
            <AppText textStyle="medium_12_18">
              Do not send tokens from other networks or other tokens
            </AppText>
            — they will be{' '}
            <AppText textStyle="medium_12_18">
              lost and cannot be recovered.
            </AppText>
          </AppText>
        </AppView>

        <AppView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end">
          <AppText color={colors.inputLabelColor}>Minimum deposit</AppText>
          <AppText>{`>1.00 ${item?.cryptoAsset.symbol}`}</AppText>
        </AppView>
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText color={colors.inputLabelColor}>Network fee</AppText>
          <AppView width="50%" flexDirection="row" justifyContent="flex-end">
            {isFeeLoading ? (
              <AppActivityIndicator size="small" />
            ) : (
              <AmountValue
                value={depositFee}
                Component={
                  <AppText color={colors.pendingStatus} marginLeft={10} />
                }
              />
            )}
            <AppText color={colors.pendingStatus} marginLeft={10}>
              {item.cryptoAsset.symbol}
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    </AppScreen>
  );
};
