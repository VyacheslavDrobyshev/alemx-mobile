import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppInput,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import {
  AssetsData,
  AppWithdrawError,
} from '@app/walletFeature/wallet/redux/types';
import { FormikConfig } from 'formik';
import { useForm } from '@app/walletFeature/wallet/common/form';
import { WithdrawFormValues } from '@app/walletFeature/wallet/screens/WithdrawDetails/types';
import {
  getWithdrawFormInitialValues,
  useWithdrawFormValidation,
} from '@app/walletFeature/wallet/screens/WithdrawDetails/form';
import { AppButton } from '@app/walletFeature/wallet/common/components/AppButton/AppButton';
import {
  createWithdrawApi,
  getPlatformFeeApi,
  getTransactionFeeApi,
} from '@app/walletFeature/wallet/api';
import { AxiosError } from 'axios';
import {
  LevelFee,
  TransactionType,
} from '@app/walletFeature/wallet/screens/Wallet/constants';
import {
  formatNumber,
  isNumber,
  roundTo,
} from '@app/walletFeature/wallet/common/utils/number';
import _ from 'lodash';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';
import { AmountValue } from '@app/walletFeature/wallet/components/AmountValue/AmountValue';

const InputAmountRightContent: FC<{
  item: AssetsData;
  onPress: () => void;
}> = ({ item, onPress }) => {
  const { colors } = useAppTheme();
  return (
    <AppView flexDirection="row">
      <AppText textStyle="regular_14_20">{item.symbol}</AppText>
      <AppView
        marginHorizontal={10}
        height={20}
        width={1}
        backgroundColor={colors.inputLabelColor}
      />
      <AppTouchable justifyContent="center" onPress={onPress}>
        <AppText textStyle="regular_12_18" color={colors.buttonPrimary}>
          MAX
        </AppText>
      </AppTouchable>
    </AppView>
  );
};

const feeLevel = LevelFee.Low;

export const WithdrawDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.WithdrawDetails>>();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();
  const [networkFee, setNetworkFee] = useState(0);

  const [platformFeeAmount, setPlatformFeeAmount] = useState('0');
  const [platformFeePercentage, setPlatformFeePercentage] = useState('3');

  const [isLoading, setIsLoading] = useState(false);
  const [isFeeLoading, setIsFeeLoading] = useState(false);

  const onSubmit = useCallback<FormikConfig<WithdrawFormValues>['onSubmit']>(
    async ({ address, amount }, { setErrors }) => {
      setIsLoading(true);
      try {
        await createWithdrawApi({
          assetId: item.cryptoAsset.id,
          amount,
          feeLevel,
          receiverOneTimeAddress: address,
        });
        navigate(WalletRoute.Wallet);
      } catch (e) {
        const error = e as AxiosError<AppWithdrawError>;
        if (typeof error.response?.data.detail === 'string') {
          if (
            error.response?.data.detail.includes('balance') ||
            error.response?.data.detail.includes('amount')
          ) {
            setErrors({
              amount: error.response?.data.detail,
            });
          } else {
            setErrors({
              address: error.response?.data.detail,
            });
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [item.cryptoAsset.id, navigate],
  );
  const validationSchema = useWithdrawFormValidation(
    roundTo(
      Number(item.balancesByAsset?.balance ?? 0),
      item.cryptoAsset.decimals ?? 4,
    ).toString(),
  );

  const initialValues = useMemo(() => getWithdrawFormInitialValues(), []);

  const { fields, formik, setErrors } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const getFee = useCallback(async () => {
    setIsFeeLoading(true);
    try {
      const networkFeeResponse = await getTransactionFeeApi({
        assetId: item.cryptoAsset.id,
        amount: fields.amount.value,
        feeLevel,
        receiverOneTimeAddress: fields.address.value,
      });
      setNetworkFee(Number(networkFeeResponse?.networkFeeConverted ?? 0));

      const platformFeeResponse = await getPlatformFeeApi({
        amount: (
          Number(fields.amount.value) -
          Number(networkFeeResponse.networkFeeConverted)
        ).toString(),
        transaction_type: TransactionType.Withdrawal,
      });
      setPlatformFeeAmount(platformFeeResponse.commissionAmount);
      setPlatformFeePercentage(platformFeeResponse.commissionPercentage);
    } catch (e) {
      const error = e as AxiosError<AppWithdrawError>;
      if (typeof error.response?.data.detail === 'string') {
        setErrors({
          address: error.response?.data.detail,
        });
      }
    } finally {
      setIsFeeLoading(false);
    }
  }, [
    fields.address.value,
    fields.amount.value,
    item.cryptoAsset.id,
    setErrors,
  ]);

  const receivedAmount = useMemo(
    () =>
      isNumber(Number(fields.amount.value)) && Number(fields.amount.value) > 0
        ? Number(fields.amount.value) -
          Number(networkFee) -
          Number(platformFeeAmount)
        : '0.00',
    [platformFeeAmount, networkFee, fields.amount.value],
  );

  const isValidAmount = useMemo(
    () =>
      isNumber(Number(fields.amount.value)) && Number(fields.amount.value) > 0,
    [fields.amount.value],
  );

  useEffect(() => {
    const debouncedValidateAmount = _.debounce(getFee, 500);
    if (isValidAmount && fields.address.value) {
      void debouncedValidateAmount();
    } else {
      setNetworkFee(0);
      setPlatformFeeAmount('0');
    }
    return () => {
      debouncedValidateAmount.cancel();
    };
  }, [fields.address.value, fields.amount.value, getFee, isValidAmount]);

  return (
    <AppScreen
      isLoading={isLoading}
      title={`Withdraw ${item?.cryptoAsset.symbol}`}>
      <AppView flex={1}>
        <AppInput
          placeholder="Paste receiving address"
          title="Address"
          {...fields.address}
        />
        <AppInput
          type="notActive"
          editable={false}
          title="Network"
          value={item.network.name}
        />
        <AppInput
          keyboardType="numeric"
          placeholder="Min amount 10 USDT "
          title="Withdraw amount"
          {...fields.amount}
          value={fields.amount.value.replace(',', '.').replace(' ', '')}
          rightContent={
            <InputAmountRightContent
              onPress={() =>
                fields.amount.setValue(
                  roundTo(
                    Number(item.balancesByAsset?.balance ?? 0),
                    item.cryptoAsset.decimals ?? 4,
                  ).toString(),
                )
              }
              item={item.cryptoAsset}
            />
          }
        />
        <AppView flexDirection="row">
          <AppText color={colors.inputLabelColor}>Available: </AppText>
          <AmountValue
            hideNegative
            value={Number(item.balancesByAsset?.balance ?? 0)}
            Component={
              <AppText
                textAlign="right"
                ellipsizeMode="middle"
                numberOfLines={1}
                textStyle="regular_14_20"
              />
            }
          />
        </AppView>
      </AppView>
      <AppView marginVertical={10}>
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
            <AppText marginLeft={10}>{item.cryptoAsset.symbol}</AppText>
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
            <AppText marginLeft={10}>{item.cryptoAsset.symbol}</AppText>
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
            <AppText marginLeft={10}>{item.cryptoAsset.symbol}</AppText>
          </AppView>
        </AppView>
      </AppView>
      <AppButton
        disabled={isFeeLoading || !formik.isValid || !formik.dirty}
        title="SEND"
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
