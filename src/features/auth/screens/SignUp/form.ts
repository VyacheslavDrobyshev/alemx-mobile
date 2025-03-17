import { object, string, ref } from 'yup';
import { useMemo } from 'react';
import { emailRegex } from '@app/features/auth/constants';

import { SignUpFormValues } from './types';

export const getSignUpFormInitialValues = (): SignUpFormValues => ({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

export const useSignUpFormValidation = () =>
  useMemo(
    () =>
      object().shape({
        username: string().trim().required('Username is required'),
        email: string()
          .required('Email is required')
          .matches(emailRegex, 'Email is not valid'),
        password: string().required('Password is required'),
        confirmPassword: string()
          .required('Password confirmation is required')
          .oneOf([ref('password')], 'Passwords must match'),
      }),
    [],
  );
