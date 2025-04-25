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
  getTransactionMaxAmountApi,
  getValidateAmountApi,
} from '@app/walletFeature/wallet/api';
import { AxiosError } from 'axios';
import {
  LevelFee,
  TransactionType,
} from '@app/walletFeature/wallet/screens/Wallet/constants';
import {
  formatNumber,
  getDecimals,
  isNumber,
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
  const [fee, setFee] = useState(0);
  const [commissionAmount, setCommissionAmount] = useState('0');
  const [commissionPercentage, setCommissionPercentage] = useState('3');
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
        if (typeof error.response?.data.error === 'string') {
          if (
            error.response?.data.error.includes('balance') ||
            error.response?.data.error.includes('amount')
          ) {
            setErrors({
              amount: error.response?.data.error,
            });
          } else {
            setErrors({
              address: error.response?.data.error,
            });
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [item.cryptoAsset.id, navigate],
  );
  const validationSchema = useWithdrawFormValidation();

  const initialValues = useMemo(() => getWithdrawFormInitialValues(), []);

  const { fields, formik, setErrors } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const validateAmount = useCallback(async () => {
    try {
      await getValidateAmountApi({
        assetId: item.cryptoAsset.id,
        amount: fields.amount.value,
        feeLevel,
        receiverOneTimeAddress: fields.address.value,
      });
    } catch (e) {
      const error = e as AxiosError<AppWithdrawError>;
      if (typeof error.response?.data.error !== 'string') {
        setErrors({
          amount: `${error.response?.data.error.message}`,
        });
      }
    }
  }, [
    fields.address.value,
    fields.amount.value,
    item.cryptoAsset.id,
    setErrors,
  ]);

  const getFee = useCallback(async () => {
    setIsFeeLoading(true);
    try {
      await validateAmount();
      const platformFeeResponse = await getPlatformFeeApi({
        amount: fields.amount.value,
        transaction_type: TransactionType.Withdrawal,
      });
      setCommissionAmount(platformFeeResponse.commissionAmount);
      setCommissionPercentage(platformFeeResponse.commissionPercentage);
      const response = await getTransactionMaxAmountApi({
        withdraw_data: {
          assetId: item.cryptoAsset.id,
          amount: fields.amount.value,
          feeLevel,
          receiverOneTimeAddress: fields.address.value,
        },
      });
      setFee(Number(response?.convertedNetworkFee ?? 0));
    } catch (e) {
      const error = e as AxiosError<AppWithdrawError>;
      if (typeof error.response?.data.error === 'string') {
        setErrors({
          address: error.response?.data.error,
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
    validateAmount,
  ]);

  const receivedAmount = useMemo(
    () =>
      isNumber(Number(fields.amount.value)) && Number(fields.amount.value) > 0
        ? Number(fields.amount.value) - Number(fee) - Number(commissionAmount)
        : '0.00',
    [commissionAmount, fee, fields.amount.value],
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
      setFee(0);
      setCommissionAmount('0');
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
                  formatNumber(
                    Number(item.balancesByAsset?.balance ?? 0),
                    undefined,
                    0,
                    getDecimals(item.cryptoAsset.decimals),
                  ) ?? '',
                )
              }
              item={item.cryptoAsset}
            />
          }
        />
        <AppText color={colors.inputLabelColor}>
          Available:{' '}
          <AppText>
            {formatNumber(
              Number(item.balancesByAsset?.balance ?? 0),
              undefined,
              2,
              getDecimals(item.cryptoAsset.decimals),
            )}
          </AppText>
        </AppText>
      </AppView>
      <AppView marginVertical={10}>
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText color={colors.inputLabelColor}>
            {`Processing fee (${formatNumber(
              Number(commissionPercentage),
              undefined,
              0,
              2,
            )}%)`}
          </AppText>
          <AppView width="50%" flexDirection="row" justifyContent="flex-end">
            {isFeeLoading ? (
              <AppActivityIndicator size="small" />
            ) : (
              <AmountValue value={commissionAmount} />
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
              <AmountValue value={fee} />
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
