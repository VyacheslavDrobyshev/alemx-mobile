import {
  AppIcon,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { StyleSheet, TextInput } from 'react-native';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  formatNumber,
  isNumber,
} from '@app/walletFeature/wallet/common/utils/number';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';
import { AmountValue } from '@app/walletFeature/wallet/components/AmountValue/AmountValue';
import { AppButton } from '@app/walletFeature/wallet/common/components/AppButton/AppButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import {
  AssetsData,
  UnifiedBalanceByNetworkDto,
} from '@app/walletFeature/wallet/redux/types';
import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';

const styles = StyleSheet.create({
  valueInput: {
    fontWeight: 700,
    fontSize: 24,
    height: 40,
    width: 150,
    textAlign: 'right',
  },
});

type SwapChangeItemProps =
  | {
      type: 'current';
      item: UnifiedBalanceByNetworkDto | null;
      onPress: () => void;
    }
  | {
      type: 'target';
      item: AssetsData | null;
      onPress: () => void;
    };

const SwapChangeItem: FC<SwapChangeItemProps> = ({ onPress, item, type }) => {
  const { colors } = useAppTheme();
  const [value, setValue] = useState(formatNumber(0));
  return (
    <AppView
      padding={15}
      height={130}
      width="100%"
      justifyContent="space-between"
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.inputBorderColor}>
      <AppView flexDirection="row" justifyContent="space-between">
        <AppText color={colors.inputLabelColor}>
          {type === 'current' ? 'Pay with' : 'You receive'}
        </AppText>
        <AppText color={colors.inputLabelColor}>{`Balance: ${formatNumber(
          type === 'current'
            ? Number(item?.totalBalanceAcrossNetworks.balance ?? 0)
            : 0,
          undefined,
          2,
          6,
        )}`}</AppText>
      </AppView>
      <AppView flexDirection="row" justifyContent="space-between">
        <AppTouchable
          onPress={onPress}
          borderRadius={8}
          borderWidth={1}
          borderColor={colors.inputBorderColor}
          height={40}
          width={130}
          padding={10}
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row">
          {item?.image ? (
            <AppImage uri={item?.image} height={24} width={24} />
          ) : (
            <AppView
              alignItems="center"
              justifyContent="center"
              height={24}
              width={24}
              borderRadius={24}
              backgroundColor={colors.buttonPrimary}>
              <AppText textStyle="medium_10_15">
                {item?.symbol.slice(0, 2)}
              </AppText>
            </AppView>
          )}

          <AppText textStyle="regular_14_20">{item?.symbol ?? 'USDT'}</AppText>
          <AppIcon name="ChevronBottom" color={colors.white} />
        </AppTouchable>
        <TextInput
          editable={type === 'current'}
          keyboardType="numeric"
          onChangeText={setValue}
          value={value.replace(',', '.').replace(' ', '')}
          style={[
            { color: colors.white },
            // eslint-disable-next-line react-native/no-inline-styles
            { opacity: type === 'target' ? 0.5 : 1 },
            styles.valueInput,
          ]}
        />
      </AppView>
      <AppView>
        <AppText color={colors.inputLabelColor} textAlign="right">
          {`$${formatNumber(
            type === 'current'
              ? Number(item?.totalBalanceAcrossNetworks.balanceUsd ?? 0)
              : 0,
            undefined,
            2,
            6,
          )} `}
          {type === 'target' && (
            <AppText color={colors.inputItemColor}>(-0.051%)</AppText>
          )}
        </AppText>
      </AppView>
    </AppView>
  );
};

export const SwapScreen = () => {
  const { colors } = useAppTheme();

  // const [isFeeLoading, setIsFeeLoading] = useState(false);
  // const [platformFeeAmount, setPlatformFeeAmount] = useState('0');
  // const [platformFeePercentage, setPlatformFeePercentage] = useState('3');
  // const [networkFee, setNetworkFee] = useState(0);

  const [isFeeLoading] = useState(false);
  const [platformFeeAmount] = useState('0');
  const [platformFeePercentage] = useState('3');
  const [networkFee] = useState(0);

  const [currentItem, setCurrentItem] =
    useState<UnifiedBalanceByNetworkDto | null>(null);
  const [targetItem, setTargetItem] = useState<AssetsData | null>(null);

  const { navigate, goBack } = useNavigation<NavigationProp<WalletParamList>>();

  const receivedAmount = useMemo(
    () =>
      isNumber(Number('1')) && Number('1') > 0
        ? Number('1') - Number(networkFee) - Number(platformFeeAmount)
        : '0.00',
    [platformFeeAmount, networkFee],
  );

  const onChooseToken = useCallback(
    (type: 'current' | 'target') =>
      (item: AssetsData | UnifiedBalanceByNetworkDto) => {
        if (type === 'current') {
          setCurrentItem(item as UnifiedBalanceByNetworkDto);
        } else {
          setTargetItem(item as AssetsData);
        }
        goBack();
      },
    [goBack],
  );

  const choseTokenHandler = useCallback(
    (type: 'current' | 'target') => {
      navigate(WalletRoute.SwapAssets, {
        onChooseToken: onChooseToken(type),
        type,
      });
    },
    [navigate, onChooseToken],
  );

  const changeItemsHandler = useCallback(() => {
    // const currentSymbol = currentItem?.networks;
    // const targetId = targetItem?.id;
  }, []);

  return (
    <AppScreen title="Exchange">
      <AppView />
      <SwapChangeItem
        type="current"
        item={currentItem}
        onPress={() => choseTokenHandler('current')}
      />
      <AppTouchable
        onPress={changeItemsHandler}
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        height={40}
        width={40}
        marginVertical={-12}
        borderRadius={40}
        borderWidth={1}
        borderColor={colors.inputBorderColor}
        zIndex={999}
        backgroundColor={colors.primary}>
        <AppIcon name="Switch" />
      </AppTouchable>
      <SwapChangeItem
        type="target"
        item={targetItem}
        onPress={() => choseTokenHandler('target')}
      />
      <AppView
        flexDirection="row"
        marginTop={20}
        padding={10}
        height={130}
        borderWidth={1}
        borderRadius={8}
        backgroundColor={colors.attentionBackground}
        borderColor={colors.attentionBorder}>
        <AppIcon marginRight={10} name="Warning" color={colors.white} />

        <AppView flexShrink={1} justifyContent="space-between">
          <AppText textStyle="medium_12_18">
            Pay attention! For this transaction network fee will be increased.
          </AppText>
          <AppText>
            You have USDT in different networks. For this withdrawal, ALEMX will
            make a cross-chain exchange so that you can get all your assets.
          </AppText>
        </AppView>
      </AppView>
      <AppView marginBottom={10} flex={1} justifyContent="flex-end">
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText color={colors.inputLabelColor}>
            {`Processing fee (${formatNumber(
              Number(platformFeePercentage),
              undefined,
              0,
              2,
            )}%)`}
          </AppText>
          <AppView width="50%" flexDirection="row" justifyContent="flex-end">
            {isFeeLoading ? (
              <AppActivityIndicator size="small" />
            ) : (
              <AmountValue value={platformFeeAmount} />
            )}
            <AppText marginLeft={10}>USDT</AppText>
          </AppView>
        </AppView>

        <AppView flexDirection="row" justifyContent="space-between">
          <AppText color={colors.inputLabelColor}>Network fee</AppText>
          <AppView width="50%" flexDirection="row" justifyContent="flex-end">
            {isFeeLoading ? (
              <AppActivityIndicator size="small" />
            ) : (
              <AmountValue value={networkFee} />
            )}
            <AppText marginLeft={10}>USDT</AppText>
          </AppView>
        </AppView>
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText color={colors.inputLabelColor}>Receive Amount</AppText>
          <AppView width="50%" justifyContent="flex-end" flexDirection="row">
            {isFeeLoading ? (
              <AppActivityIndicator size="small" />
            ) : (
              <AmountValue
                hideNegative
                value={receivedAmount}
                Component={
                  <AppText
                    textAlign="right"
                    ellipsizeMode="middle"
                    numberOfLines={1}
                    textStyle="medium_14_20"
                  />
                }
              />
            )}
            <AppText marginLeft={10}>USDT</AppText>
          </AppView>
        </AppView>
      </AppView>
      <AppButton title="EXCHANGE" />
    </AppScreen>
  );
};
