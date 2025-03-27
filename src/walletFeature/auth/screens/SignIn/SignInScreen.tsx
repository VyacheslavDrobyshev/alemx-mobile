import { FC, useCallback, useMemo } from 'react';
import {
  AppIcon,
  AppInput,
  AppScreen,
  AppText,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UnauthorizedRoute } from '@app/walletFeature/auth/navigation/constants';
import { UnauthorizedParamList } from '@app/walletFeature/auth/navigation/types';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { useForm } from '@app/walletFeature/wallet/common/form';
import { FormikConfig } from 'formik';
import { SignInFormValues } from '@app/walletFeature/auth/screens/SignIn/types';
import {
  getSignInFormInitialValues,
  useSignInFormValidation,
} from '@app/walletFeature/auth/screens/SignIn/form';
import { AppButton } from '@app/walletFeature/wallet/common/components/AppButton/AppButton';
import { isThunkPayload, useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import { loginThunk } from '@app/walletFeature/auth/redux/thunks';
import { useSelector } from 'react-redux';
import { selectIsLoadingAuth } from '@app/walletFeature/auth/redux/selectors';

export const SignInScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<UnauthorizedParamList>>();
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoadingAuth);

  const signUpNavigateHandler = useCallback(() => {
    navigate(UnauthorizedRoute.SignUp);
  }, [navigate]);

  const onSubmit = useCallback<FormikConfig<SignInFormValues>['onSubmit']>(
    async ({ email, password }, { setErrors }) => {
      const { payload } = await dispatch(loginThunk({ email, password }));
      if (!isThunkPayload(payload)) {
        setErrors({ password: payload, email: payload });
      }
    },
    [dispatch],
  );
  const validationSchema = useSignInFormValidation();

  const initialValues = useMemo(() => getSignInFormInitialValues(), []);

  const { fields, formik } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <AppScreen withHeader={false}>
      <AppView gap={20} flex={1} justifyContent="center">
        <AppInput
          {...fields.email}
          leftContent={<AppIcon name="Message" color={colors.inputItemColor} />}
          placeholder="Email"
        />
        <AppInput
          {...fields.password}
          leftContent={<AppIcon name="Lock" color={colors.inputItemColor} />}
          placeholder="Password"
          secureTextEntry
        />
        <AppView gap={5} flexDirection="row" justifyContent="center">
          <AppText
            color={colors.inputItemColor}
            textAlign="center"
            textStyle="regular_12_18">
            Don't have an account yet?
          </AppText>
          <AppText
            onPress={signUpNavigateHandler}
            color={colors.buttonPrimary}
            textStyle="medium_12_18">
            Create a new one
          </AppText>
        </AppView>
      </AppView>
      <AppButton
        isLoading={isLoading}
        disabled={!formik.isValid}
        title="LOGIN"
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
