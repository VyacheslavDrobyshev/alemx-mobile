import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppInput,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
} from '@app/components';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import { useAppTheme } from '@app/theme';
import { AssetsData, AppWithdrawError } from '@app/features/wallet/redux/types';
import { FormikConfig } from 'formik';
import { useForm } from '@app/form';
import { WithdrawFormValues } from '@app/features/wallet/screens/WithdrawDetails/types';
import {
  getWithdrawFormInitialValues,
  useWithdrawFormValidation,
} from '@app/features/wallet/screens/WithdrawDetails/form';
import { AppButton } from '@app/components/AppButton/AppButton';
import {
  createWithdrawApi,
  getTransactionFeeApi,
} from '@app/features/wallet/api';
import { AxiosError } from 'axios';
import { LevelFee } from '@app/features/wallet/screens/Wallet/constants';
import { formatNumber, isNumber } from '@app/utils/number';
import _ from 'lodash';

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

const feeLevel = LevelFee.High;

export const WithdrawDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.WithdrawDetails>>();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();
  const [fee, setFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
          setErrors({
            amount: error.response?.data.detail,
          });
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

  const getFee = useCallback(async () => {
    try {
      const response = await getTransactionFeeApi({
        assetId: item.cryptoAsset.id,
        amount: fields.amount.value,
        feeLevel,
        receiverOneTimeAddress: fields.address.value,
      });
      setFee(response[feeLevel.toLowerCase()].networkFee);
    } catch (e) {
      const error = e as AxiosError<AppWithdrawError>;
      if (typeof error.response?.data.detail === 'string') {
        setErrors({
          address: error.response?.data.detail,
        });
      }
    }
  }, [
    fields.address.value,
    fields.amount.value,
    item.cryptoAsset.id,
    setErrors,
  ]);

  const receivedAmount = useMemo(
    () =>
      isNumber(Number(fields.amount.value))
        ? formatNumber(
            Number(fields.amount.value) - fee,
            undefined,
            2,
            item.cryptoAsset.decimals ?? 2,
          )
        : '--',
    [fee, fields.amount.value, item.cryptoAsset.decimals],
  );

  useEffect(() => {
    const debouncedValidateAmount = _.debounce(getFee, 500);
    if (fields.amount.value && fields.address.value) {
      void debouncedValidateAmount();
    }
    return () => {
      debouncedValidateAmount.cancel();
    };
  }, [fields.address.value, fields.amount.value, getFee]);

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
          placeholder="Paste amount"
          title="Withdraw amount"
          {...fields.amount}
          value={fields.amount.value.replace(',', '.').replace(' ', '')}
          rightContent={
            <InputAmountRightContent
              onPress={() =>
                fields.amount.setValue(item.balancesByAsset?.balance ?? '')
              }
              item={item.cryptoAsset}
            />
          }
        />
        <AppText color={colors.inputLabelColor}>
          Available:{' '}
          <AppText>
            {formatNumber(Number(item.balancesByAsset?.balance ?? 0))}
          </AppText>
        </AppText>
      </AppView>
      <AppView marginVertical={10}>
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText color={colors.inputLabelColor}>Network fee</AppText>
          <AppText>{`${formatNumber(
            fee,
            undefined,
            2,
            item.cryptoAsset.decimals ?? 2,
          )} ${item.cryptoAsset.symbol}`}</AppText>
        </AppView>
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText color={colors.inputLabelColor}>Receive Amount</AppText>
          <AppText
            textAlign="right"
            ellipsizeMode="middle"
            numberOfLines={1}
            width="70%"
            textStyle="medium_14_20">{`${receivedAmount} ${item.cryptoAsset.symbol}`}</AppText>
        </AppView>
      </AppView>

      <AppButton
        disabled={!formik.isValid}
        title="SUBMIT"
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
