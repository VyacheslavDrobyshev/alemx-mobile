import { FC, useCallback, useMemo } from 'react';
import { UnauthorizedRoute } from '@app/walletFeature/auth/navigation/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UnauthorizedParamList } from '@app/walletFeature/auth/navigation/types';
import {
  AppIcon,
  AppInput,
  AppScreen,
  AppText,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { FormikConfig } from 'formik';
import { registerThunk } from '@app/walletFeature/auth/redux/thunks';
import { useForm } from '@app/walletFeature/wallet/common/form';
import { isThunkPayload, useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import {
  getSignUpFormInitialValues,
  useSignUpFormValidation,
} from '@app/walletFeature/auth/screens/SignUp/form';
import { SignUpFormValues } from '@app/walletFeature/auth/screens/SignUp/types';
import { AppButton } from '@app/walletFeature/wallet/common/components/AppButton/AppButton';
import { useSelector } from 'react-redux';
import { selectIsLoadingAuth } from '@app/walletFeature/auth/redux/selectors';

export const SignUpScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<UnauthorizedParamList>>();
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoadingAuth);
  const signInNavigateHandler = useCallback(() => {
    navigate(UnauthorizedRoute.SignIn);
  }, [navigate]);

  const onSubmit = useCallback<FormikConfig<SignUpFormValues>['onSubmit']>(
    async ({ email, password, username, confirmPassword }, { setErrors }) => {
      const { payload } = await dispatch(
        registerThunk({ email, password, confirmPassword, username }),
      );
      if (!isThunkPayload(payload)) {
        setErrors({ password: payload, email: payload });
      }
    },
    [dispatch],
  );
  const validationSchema = useSignUpFormValidation();

  const initialValues = useMemo(() => getSignUpFormInitialValues(), []);

  const { fields, formik } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <AppScreen withHeader={false}>
      <AppView gap={20} flex={1} justifyContent="center">
        <AppInput
          {...fields.username}
          leftContent={<AppIcon name="User" color={colors.inputItemColor} />}
          placeholder="Username"
        />
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
        <AppInput
          {...fields.confirmPassword}
          leftContent={<AppIcon name="Lock" color={colors.inputItemColor} />}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <AppView gap={5} flexDirection="row" justifyContent="center">
          <AppText
            color={colors.inputItemColor}
            textAlign="center"
            textStyle="regular_12_18">
            Already have an account?
          </AppText>
          <AppText
            onPress={signInNavigateHandler}
            color={colors.buttonPrimary}
            textStyle="medium_12_18">
            Login
          </AppText>
        </AppView>
      </AppView>
      <AppButton
        isLoading={isLoading}
        disabled={!formik.isValid}
        title="REGISTER"
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
