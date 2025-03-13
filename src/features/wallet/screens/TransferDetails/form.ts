import { number, object } from 'yup';
import { useMemo } from 'react';

import { TransferFormValues } from './types.ts';

export const getTransferFormInitialValues = (): TransferFormValues => ({
  amount: '',
});

export const useTransferFormValidation = () => {
  return useMemo(
    () =>
      object().shape({
        amount: number()
          .typeError('Amount must be a number')
          .min(0, 'Amount must be positive')
          .required('Amount is required'),
      }),
    [],
  );
};
