import { object, string } from 'yup';
import { useMemo } from 'react';

import { SignInFormValues } from './types';
import { emailRegex } from '@app/features/auth/constants.ts';

export const getSignInFormInitialValues = (): SignInFormValues => ({
  email: '',
  password: '',
});

export const useSignInFormValidation = () => {
  return useMemo(
    () =>
      object().shape({
        email: string()
          .required('Email is required')
          .matches(emailRegex, 'Email is not valid'),
        password: string().required('Password is required'),
      }),
    [],
  );
};
