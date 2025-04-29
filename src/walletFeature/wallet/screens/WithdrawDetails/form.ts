import { number, object, string } from 'yup';
import { useMemo } from 'react';

import { WithdrawFormValues } from './types';

export const getWithdrawFormInitialValues = (): WithdrawFormValues => ({
  address: '',
  amount: '',
});

export const useWithdrawFormValidation = (balance: string) =>
  useMemo(
    () =>
      object().shape({
        address: string().required('Please enter receiving address'),
        amount: number()
          .typeError('Amount must be a number')
          .min(10, 'Minimum withdrawal amount is 10 USDT')
          .max(Number(balance), 'Insufficient funds.')
          .required('Amount is required'),
      }),
    [balance],
  );
