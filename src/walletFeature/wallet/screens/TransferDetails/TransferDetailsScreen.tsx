import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppIcon,
  AppInput,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { AppWithdrawError } from '@app/walletFeature/wallet/redux/types';
import { FormikConfig } from 'formik';
import { useForm } from '@app/walletFeature/wallet/common/form';
import { AppButton } from '@app/walletFeature/wallet/common/components/AppButton/AppButton';
import {
  createTransferApi,
  getPlatformFeeApi,
} from '@app/walletFeature/wallet/api';
import {
  LevelFee,
  TransactionType,
} from '@app/walletFeature/wallet/screens/Wallet/constants';
import {
  getTransferFormInitialValues,
  useTransferFormValidation,
} from '@app/walletFeature/wallet/screens/TransferDetails/form';
import { TransferFormValues } from '@app/walletFeature/wallet/screens/TransferDetails/types';
import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';
import { AxiosError } from 'axios';
import {
  formatNumber,
  isNumber,
  roundTo,
} from '@app/walletFeature/wallet/common/utils/number';
import _ from 'lodash';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';
import { AmountValue } from '@app/walletFeature/wallet/components/AmountValue/AmountValue';

const InputAmountRightContent: FC<{
  symbol: string;
  onPress: () => void;
}> = ({ symbol, onPress }) => {
  const { colors } = useAppTheme();
  return (
    <AppView flexDirection="row">
      <AppText>{symbol}</AppText>
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

const feeLevel = LevelFee.Low;

export const TransferDetailsScreen: FC = () => {
  const {
    params: { item, user },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.TransferDetails>>();

  const { navigate, dispatch } =
    useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isFeeLoading, setIsFeeLoading] = useState(false);

  const [platformFeeAmount, setPlatformFeeAmount] = useState('0');
  const [platformFeePercentage, setPlatformFeePercentage] = useState('1');

  const onSubmit = useCallback<FormikConfig<TransferFormValues>['onSubmit']>(
    async ({ amount }, { setErrors }) => {
      setIsLoading(true);
      try {
        await createTransferApi({
          assetId: 961, // 1043 for external app
          amount,
          feeLevel,
          receiverUserId: user.id,
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
    [navigate, user.id],
  );
  const validationSchema = useTransferFormValidation(
    roundTo(
      Number(item?.totalBalanceAcrossNetworks.balance ?? 0),
      item.networks[0].asset.decimals,
    ).toString(),
  );

  const initialValues = useMemo(() => getTransferFormInitialValues(), []);

  const { fields, formik, setErrors } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const name = useMemo(
    () => (user.username ? user.username : user.email),
    [user],
  );

  const changeUserHandler = useCallback(() => {
    dispatch(StackActions.push(WalletRoute.TransferUser, { item }));
  }, [dispatch, item]);

  const changeAssetHandler = useCallback(() => {
    dispatch(StackActions.push(WalletRoute.TransferAsset, { user }));
  }, [dispatch, user]);

  const receivedAmount = useMemo(
    () =>
      isNumber(Number(fields.amount.value)) && Number(fields.amount.value) > 0
        ? Number(fields.amount.value) - Number(platformFeeAmount)
        : '0.00',
    [platformFeeAmount, fields.amount.value],
  );

  const isValidAmount = useMemo(
    () =>
      isNumber(Number(fields.amount.value)) && Number(fields.amount.value) > 0,
    [fields.amount.value],
  );

  const getFee = useCallback(async () => {
    setIsFeeLoading(true);
    try {
      const platformFeeResponse = await getPlatformFeeApi({
        amount: fields.amount.value,
        transaction_type: TransactionType.Transfer,
      });
      setPlatformFeeAmount(platformFeeResponse.commissionAmount);
      setPlatformFeePercentage(platformFeeResponse.commissionPercentage);
    } catch (e) {
      const error = e as AxiosError<AppWithdrawError>;
      if (typeof error.response?.data.detail === 'string') {
        setErrors({ amount: error.response?.data.detail });
      }
    } finally {
      setIsFeeLoading(false);
    }
  }, [fields.amount.value, setErrors]);

  useFocusEffect(
    useCallback(() => {
      void formik.setValues({ amount: '' });
      formik.setErrors({});
      void formik.setTouched({ amount: false });
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const debouncedValidateAmount = _.debounce(getFee, 500);
    if (isValidAmount) {
      void debouncedValidateAmount();
    } else {
      setPlatformFeeAmount('0');
      setPlatformFeePercentage('1');
    }
    return () => {
      debouncedValidateAmount.cancel();
    };
  }, [fields.amount.value, getFee, isValidAmount]);

  return (
    <AppScreen isLoading={isLoading} title="Transfer">
      <AppView flex={1}>
        <AppInput
          onPress={changeUserHandler}
          editable={false}
          value={name}
          leftContent={
            <AppView
              justifyContent="center"
              alignItems="center"
              height={30}
              width={30}
              borderRadius={30}
              backgroundColor={colors.buttonPrimary}>
              <AppText>{name.slice(0, 1).toUpperCase()}</AppText>
            </AppView>
          }
          rightContent={
            <AppIcon
              onPress={changeUserHandler}
              name="ChevronRight"
              color={colors.white}
            />
          }
          title="To"
        />
        <AppInput
          onPress={changeAssetHandler}
          editable={false}
          value={item.name}
          leftContent={
            item.image ? (
              <AppImage height={30} width={30} uri={item.image} />
            ) : (
              <AppView
                justifyContent="center"
                alignItems="center"
                height={30}
                width={30}
                borderRadius={30}
                backgroundColor={colors.buttonPrimary}>
                <AppText>{item.name.slice(0, 1).toUpperCase()}</AppText>
              </AppView>
            )
          }
          title="Coin"
          rightContent={
            <AppIcon
              onPress={changeAssetHandler}
              name="ChevronRight"
              color={colors.white}
            />
          }
        />
        <AppInput
          keyboardType="numeric"
          placeholder="Paste amount"
          title="Amount"
          {...fields.amount}
          value={fields.amount.value.replace(',', '.').replace(' ', '')}
          rightContent={
            <InputAmountRightContent
              onPress={() =>
                fields.amount.setValue(
                  roundTo(
                    Number(item?.totalBalanceAcrossNetworks.balance ?? 0),
                    item.networks[0].asset.decimals,
                  ).toString(),
                )
              }
              symbol={item.symbol}
            />
          }
        />
        <AppView flexDirection="row">
          <AppText color={colors.inputLabelColor}>Available: </AppText>
          <AmountValue
            hideNegative
            value={Number(item?.totalBalanceAcrossNetworks.balance)}
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
            <AppText marginLeft={10}>{item.symbol}</AppText>
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
            <AppText marginLeft={10}>{item.symbol}</AppText>
          </AppView>
        </AppView>
      </AppView>
      <AppButton
        disabled={!formik.isValid || !formik.dirty}
        title="SEND"
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
