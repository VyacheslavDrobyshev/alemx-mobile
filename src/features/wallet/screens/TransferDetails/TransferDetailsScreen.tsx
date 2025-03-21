import { FC, useCallback, useMemo, useState } from 'react';
import {
  AppIcon,
  AppInput,
  AppScreen,
  AppText,
  AppTouchable,
  AppView,
} from '@app/components';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import { useAppTheme } from '@app/theme';
import { AppWithdrawError, AssetsData } from '@app/features/wallet/redux/types';
import { FormikConfig } from 'formik';
import { useForm } from '@app/form';
import { AppButton } from '@app/components/AppButton/AppButton';
import { createTransferApi } from '@app/features/wallet/api';
import { LevelFee } from '@app/features/wallet/screens/Wallet/constants';
import {
  getTransferFormInitialValues,
  useTransferFormValidation,
} from '@app/features/wallet/screens/TransferDetails/form';
import { TransferFormValues } from '@app/features/wallet/screens/TransferDetails/types';
import { AppImage } from '@app/components/AppImage/AppImage';
import { AxiosError } from 'axios';
import { formatNumber } from '@app/utils/number';

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

export const TransferDetailsScreen: FC = () => {
  const {
    params: { item, user },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.TransferDetails>>();

  const { navigate, goBack, dispatch } =
    useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback<FormikConfig<TransferFormValues>['onSubmit']>(
    async ({ amount }, { setErrors }) => {
      setIsLoading(true);
      try {
        await createTransferApi({
          assetId: item.cryptoAsset.id,
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
    [item.cryptoAsset.id, navigate, user.id],
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
          onPress={goBack}
          editable={false}
          value={item.cryptoAsset.name}
          leftContent={
            <AppImage height={30} width={30} uri={item.cryptoAsset.image} />
          }
          title="Coin"
          rightContent={
            <AppIcon
              onPress={goBack}
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
                    Number(item.balancesByAsset?.balance),
                    undefined,
                    0,
                    item.cryptoAsset.decimals ?? 0,
                  ),
                )
              }
              item={item.cryptoAsset}
            />
          }
        />
        <AppText color={colors.inputLabelColor}>
          Available: <AppText>{Number(item.balancesByAsset?.balance)}</AppText>
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
