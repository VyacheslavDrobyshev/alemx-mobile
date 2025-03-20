import { number, object } from 'yup';
import { useMemo } from 'react';

import { TransferFormValues } from './types';

export const getTransferFormInitialValues = (): TransferFormValues => ({
  amount: '',
});

export const useTransferFormValidation = () =>
  useMemo(
    () =>
      object().shape({
        amount: number()
          .typeError('Amount must be a number')
          .notOneOf([0], 'Amount cannot be 0')
          .required('Amount is required'),
      }),
    [],
  );
