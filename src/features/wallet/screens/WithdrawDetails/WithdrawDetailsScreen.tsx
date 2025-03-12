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
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import { useAppTheme } from '@app/theme';
import { AssetsData } from '@app/features/wallet/redux/types.ts';
import { FormikConfig } from 'formik';
import * as _ from 'lodash';

import { useForm } from '@app/form';
import { WithdrawFormValues } from '@app/features/wallet/screens/WithdrawDetails/types.ts';
import {
  getWithdrawFormInitialValues,
  useWithdrawFormValidation,
} from '@app/features/wallet/screens/WithdrawDetails/form.ts';
import { AppButton } from '@app/components/AppButton/AppButton.tsx';
import {
  createWithdrawApi,
  getTransactionFeeApi,
  getValidateAmountApi,
} from '@app/features/wallet/api';
import { AxiosError } from 'axios';
import { AppWithdrawError } from '@app/features/wallet/redux/types.ts';
import { useAppToast } from '@app/components/AppToast/useAppToast.ts';
import { LevelFee } from '@app/features/wallet/screens/Wallet/constants.ts';
import { formatNumber } from '@app/utils/number.ts';

const InputAmountRightContent: FC<{
  item: AssetsData;
  onPress: () => void;
}> = ({ item, onPress }) => {
  const { colors } = useAppTheme();
  return (
    <AppView flexDirection="row">
      <AppText>{item.symbol}</AppText>
      <AppView
        marginHorizontal={10}
        height={20}
        width={1}
        backgroundColor={colors.inputLabelColor}
      />
      <AppTouchable onPress={onPress}>
        <AppText color={colors.buttonPrimary}>MAX</AppText>
      </AppTouchable>
    </AppView>
  );
};

const feeLevel = LevelFee.High;

export const WithdrawDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<MainParamList, MainRoute.WithdrawDetails>>();
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  const { showError } = useAppToast();
  const { colors } = useAppTheme();
  const [fee, setFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback<FormikConfig<WithdrawFormValues>['onSubmit']>(
    async ({ address, amount }) => {
      setIsLoading(true);
      try {
        await createWithdrawApi({
          assetId: item.cryptoAsset.id,
          amount,
          feeLevel,
          receiverOneTimeAddress: address,
        });
        navigate(MainRoute.Wallet);
      } catch (e) {
        showError('Ups, something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [item.cryptoAsset.id, navigate, showError],
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
      setFee(response[feeLevel].networkFee);
    } catch (e) {
      showError('Ups, something went wrong');
    }
  }, [
    fields.address.value,
    fields.amount.value,
    item.cryptoAsset.id,
    showError,
  ]);

  const validateAmount = useCallback(async () => {
    try {
      await getValidateAmountApi({
        assetId: item.cryptoAsset.id,
        amount: fields.amount.value,
        feeLevel,
        receiverOneTimeAddress: fields.address.value,
      });
      void getFee();
    } catch (e) {
      const error = e as AxiosError<AppWithdrawError>;
      if (typeof error.response?.data.detail === 'string') {
        setErrors({
          address: error.response?.data.detail,
        });
      } else {
        setErrors({
          amount: error.response?.data.detail.message,
        });
      }
    }
  }, [
    item.cryptoAsset.id,
    fields.amount.value,
    fields.address.value,
    getFee,
    setErrors,
  ]);

  useEffect(() => {
    const debouncedValidateAmount = _.debounce(validateAmount, 500);
    if (fields.amount.isValid && fields.address.isValid) {
      debouncedValidateAmount();
    }
    return () => {
      debouncedValidateAmount.cancel();
    };
  }, [fields.address.isValid, fields.amount.isValid, validateAmount]);

  return (
    <AppScreen
      isLoading={isLoading}
      title={`Withdraw ${item?.cryptoAsset.symbol}`}
      noScroll>
      <AppView flex={1}>
        <AppInput
          placeholder={'Paste receiving address'}
          title={'Address'}
          {...fields.address}
        />
        <AppInput
          placeholder={'Paste amount'}
          title={'Withdraw amount'}
          {...fields.amount}
          rightContent={
            <InputAmountRightContent
              onPress={() =>
                fields.amount.setValue(item.balancesByAsset?.balance ?? '')
              }
              item={item!.cryptoAsset}
            />
          }
        />
        <AppText color={colors.inputLabelColor}>
          Available:{' '}
          <AppText>
            {formatNumber(Number(item.balancesByAsset?.balance))}
          </AppText>
        </AppText>
      </AppView>
      <AppView marginVertical={10}>
        <AppView flexDirection={'row'} justifyContent={'space-between'}>
          <AppText color={colors.inputLabelColor}>Network fee</AppText>
          <AppText>{`${formatNumber(fee, undefined, 7, 7)} ${
            item.cryptoAsset.symbol
          }`}</AppText>
        </AppView>
        <AppView flexDirection={'row'} justifyContent={'space-between'}>
          <AppText color={colors.inputLabelColor}>Receive Amount</AppText>
          <AppText textStyle={'medium_14_20'}>{`${formatNumber(
            +fields.amount.value - fee,
            undefined,
            6,
            6,
          )} ${item.cryptoAsset.symbol}`}</AppText>
        </AppView>
      </AppView>

      <AppButton
        disabled={!formik.isValid}
        title={'SUBMIT'}
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
