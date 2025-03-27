import { object, string } from 'yup';
import { useMemo } from 'react';
import { emailRegex } from '@app/walletFeature/auth/constants';

import { SignInFormValues } from './types';

export const getSignInFormInitialValues = (): SignInFormValues => ({
  email: '',
  password: '',
});

export const useSignInFormValidation = () =>
  useMemo(
    () =>
      object().shape({
        email: string()
          .required('Email is required')
          .matches(emailRegex, 'Email is not valid'),
        password: string().required('Password is required'),
      }),
    [],
  );
