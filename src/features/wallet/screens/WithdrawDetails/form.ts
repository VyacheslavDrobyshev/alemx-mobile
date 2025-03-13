import { number, object, string } from 'yup';
import { useMemo } from 'react';

import { WithdrawFormValues } from './types.ts';

export const getWithdrawFormInitialValues = (): WithdrawFormValues => ({
  address: '',
  amount: '',
});

export const useWithdrawFormValidation = () => {
  return useMemo(
    () =>
      object().shape({
        address: string().required('Please enter receiving address'),
        amount: number()
          .typeError('Amount must be a number')
          .min(0, 'Amount must be positive')
          .required('Amount is required'),
      }),
    [],
  );
};
