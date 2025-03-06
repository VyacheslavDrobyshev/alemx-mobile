import { FC, useCallback, useMemo } from 'react';
import {
  AppIcon,
  AppInput,
  AppScreen,
  AppText,
  AppView,
} from '@app/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UnauthorizedRoute } from '@app/features/rootNavigation/unauthorized/constants.ts';
import { UnauthorizedParamList } from '@app/features/rootNavigation/unauthorized/types.ts';
import { useAppTheme } from '@app/theme';
import { useForm } from '@app/form';
import { FormikConfig } from 'formik';
import { SignInFormValues } from '@app/features/auth/screens/SignIn/types.ts';
import {
  getSignInFormInitialValues,
  useSignInFormValidation,
} from '@app/features/auth/screens/SignIn/form.ts';
import { AppButton } from '@app/components/AppButton/AppButton.tsx';
import { isThunkPayload, useAppDispatch } from '@app/redux';
import { loginThunk } from '@app/features/auth/redux/thunks.ts';
import { useSelector } from 'react-redux';
import { selectIsLoadingAuth } from '@app/features/auth/redux/selectors.ts';

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
    <AppScreen>
      <AppView gap={20} flex={1} justifyContent={'center'}>
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
        <AppView gap={5} flexDirection={'row'} justifyContent={'center'}>
          <AppText
            color={colors.inputItemColor}
            textAlign={'center'}
            textStyle={'regular_12_18'}>
            Don't have an account yet?
          </AppText>
          <AppText
            onPress={signUpNavigateHandler}
            color={colors.inputActiveColor}
            textStyle={'medium_12_18'}>
            Create a new one
          </AppText>
        </AppView>
      </AppView>
      <AppButton
        isLoading={isLoading}
        disabled={!formik.isValid}
        title={'Login'}
        onPress={formik.submitForm}
      />
    </AppScreen>
  );
};
