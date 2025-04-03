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
import { createTransferApi } from '@app/walletFeature/wallet/api';
import { LevelFee } from '@app/walletFeature/wallet/screens/Wallet/constants';
import {
  getTransferFormInitialValues,
  useTransferFormValidation,
} from '@app/walletFeature/wallet/screens/TransferDetails/form';
import { TransferFormValues } from '@app/walletFeature/wallet/screens/TransferDetails/types';
import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';
import { AxiosError } from 'axios';
import {
  formatNumber,
  getDecimals,
} from '@app/walletFeature/wallet/common/utils/number';

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

const feeLevel = LevelFee.High;

export const TransferDetailsScreen: FC = () => {
  const {
    params: { item, user },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.TransferDetails>>();

  const { navigate, dispatch } =
    useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback<FormikConfig<TransferFormValues>['onSubmit']>(
    async ({ amount }, { setErrors }) => {
      setIsLoading(true);
      try {
        await createTransferApi({
          assetId: item.networks[0].asset.assetId,
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
    [item.networks, navigate, user.id],
  );
  const validationSchema = useTransferFormValidation();

  const initialValues = useMemo(() => getTransferFormInitialValues(), []);

  const { fields, formik } = useForm({
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

  useEffect(() => {
    fields.amount.setValue('');
    formik.setErrors({});
    void formik.setTouched({ amount: false });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          leftContent={<AppImage height={30} width={30} uri={item.image} />}
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
                  formatNumber(
                    Number(item?.totalBalanceAcrossNetworks.balance),
                    undefined,
                    0,
                    getDecimals(item.networks[0].asset.decimals),
                  ),
                )
              }
              symbol={item.symbol}
            />
          }
        />
        <AppText color={colors.inputLabelColor}>
          Available:{' '}
          <AppText>
            {formatNumber(
              Number(item?.totalBalanceAcrossNetworks.balance),
              undefined,
              0,
              getDecimals(item.networks[0].asset.decimals),
            )}
          </AppText>
        </AppText>
      </AppView>

      <AppButton
        disabled={!formik.isValid || !formik.dirty}
        title="SUBMIT"
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
