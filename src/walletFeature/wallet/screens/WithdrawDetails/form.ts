import { number, object, string } from 'yup';
import { useMemo } from 'react';

import { WithdrawFormValues } from './types';

export const getWithdrawFormInitialValues = (): WithdrawFormValues => ({
  address: '',
  amount: '',
});

export const useWithdrawFormValidation = () =>
  useMemo(
    () =>
      object().shape({
        address: string().required('Please enter receiving address'),
        amount: number()
          .typeError('Amount must be a number')
          .moreThan(0, 'Amount must be positive value')
          .required('Amount is required'),
      }),
    [],
  );
