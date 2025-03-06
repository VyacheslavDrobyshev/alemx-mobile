import { object, string, ref } from 'yup';

import { useMemo } from 'react';

import { SignUpFormValues } from './types';
import { emailRegex } from '@app/features/auth/constants.ts';

export const getSignUpFormInitialValues = (): SignUpFormValues => ({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

export const useSignUpFormValidation = () => {
  return useMemo(() => {
    return object().shape({
      username: string().trim().required('Username is required'),
      email: string()
        .required('Email is required')
        .matches(emailRegex, 'Email is not valid'),
      password: string().required('Password is required'),
      confirmPassword: string()
        .required('Password confirmation is required')
        .oneOf([ref('password')], 'Passwords must match'),
    });
  }, []);
};
