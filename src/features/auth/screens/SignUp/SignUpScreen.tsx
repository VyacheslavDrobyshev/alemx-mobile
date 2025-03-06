import { FC, useCallback, useMemo } from 'react';
import { UnauthorizedRoute } from '@app/features/rootNavigation/unauthorized/constants.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UnauthorizedParamList } from '@app/features/rootNavigation/unauthorized/types.ts';
import {
  AppIcon,
  AppInput,
  AppScreen,
  AppText,
  AppView,
} from '@app/components';
import { useAppTheme } from '@app/theme';
import { FormikConfig } from 'formik';
import { registerThunk } from '@app/features/auth/redux/thunks.ts';
import { useForm } from '@app/form';
import { isThunkPayload, useAppDispatch } from '@app/redux';
import {
  getSignUpFormInitialValues,
  useSignUpFormValidation,
} from '@app/features/auth/screens/SignUp/form.ts';
import { SignUpFormValues } from '@app/features/auth/screens/SignUp/types.ts';
import { AppButton } from '@app/components/AppButton/AppButton.tsx';
import { useSelector } from 'react-redux';
import { selectIsLoadingAuth } from '@app/features/auth/redux/selectors.ts';

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
      <AppView gap={20} flex={1} justifyContent={'center'}>
        <AppInput
          {...fields.username}
          leftContent={<AppIcon name={'User'} color={colors.inputItemColor} />}
          placeholder={'Username'}
        />
        <AppInput
          {...fields.email}
          leftContent={
            <AppIcon name={'Message'} color={colors.inputItemColor} />
          }
          placeholder={'Email'}
        />
        <AppInput
          {...fields.password}
          leftContent={<AppIcon name={'Lock'} color={colors.inputItemColor} />}
          placeholder={'Password'}
          secureTextEntry
        />
        <AppInput
          {...fields.confirmPassword}
          leftContent={<AppIcon name={'Lock'} color={colors.inputItemColor} />}
          placeholder={'Confirm Password'}
          secureTextEntry
        />
        <AppView gap={5} flexDirection={'row'} justifyContent={'center'}>
          <AppText
            color={colors.inputItemColor}
            textAlign={'center'}
            textStyle={'regular_12_18'}>
            Already have an account?
          </AppText>
          <AppText
            onPress={signInNavigateHandler}
            color={colors.buttonPrimary}
            textStyle={'medium_12_18'}>
            Login
          </AppText>
        </AppView>
      </AppView>
      <AppButton
        isLoading={isLoading}
        disabled={!formik.isValid}
        title={'REGISTER'}
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
