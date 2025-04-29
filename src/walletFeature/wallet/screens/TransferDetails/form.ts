import { number, object } from 'yup';
import { useMemo } from 'react';

import { TransferFormValues } from './types';

export const getTransferFormInitialValues = (): TransferFormValues => ({
  amount: '',
});

export const useTransferFormValidation = (balance: string) =>
  useMemo(
    () =>
      object().shape({
        amount: number()
          .typeError('Amount must be a number')
          .moreThan(0, 'Amount must be positive value')
          .max(Number(balance), 'Insufficient funds')
          .required('Amount is required'),
      }),
    [balance],
  );
