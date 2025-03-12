import { number, object, string } from 'yup';
import { useMemo } from 'react';

import { WithdrawFormValues } from './types.ts';

export const getWithdrawFormInitialValues = (): WithdrawFormValues => ({
  address: 'AJwEmchVjcjSYRxQtmZNx7WfYEzBRSBFXA4Cz2bFWZ9Z',
  amount: '',
});

export const useWithdrawFormValidation = () => {
  return useMemo(
    () =>
      object().shape({
        address: string().required('Please enter receiving address'),
        amount: number()
          .typeError('Amount must be a number') // Сообщение, если введён нечисловой формат
          .min(0, 'Amount must be positive')
          .required('Amount is required'),
      }),
    [],
  );
};
