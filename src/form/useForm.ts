import { useCallback, useMemo } from 'react';
import { useFormik, FormikValues, FormikConfig } from 'formik';
import { keys } from 'lodash';

import { Field, FormFields, UseFormFormikConfig } from './types';

export function useForm<FV extends FormikValues>({
  initialTouched = true,
  ignoredFields,
  ...config
}: UseFormFormikConfig<FV>) {
  const initialTouchedValue = useMemo(() => {
    if (initialTouched === true) {
      return Object.entries(config.initialValues).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: !!value }),
        {} as Required<FormikConfig<FV>>['initialTouched'],
      );
    }
    return initialTouched;
  }, [config.initialValues, initialTouched]);

  const formik = useFormik<FV>({
    validateOnBlur: true,
    validateOnChange: true,
    initialTouched: initialTouchedValue,
    ...config,
  });

  const { values, errors, touched, setFieldValue, validateField, handleBlur } =
    formik;

  const getField = useCallback(
    <V>(name: keyof FV): Field<V> => {
      const isValid = !(!!errors[name] && touched[name]);
      const setValue = (value: V | undefined) =>
        setFieldValue(name as string, value);
      return {
        value: values[name],
        errorMessage: !isValid ? (errors[name] as string) : '',
        onChangeText: setValue,
        onBlur: handleBlur(name) as Field<V>['onBlur'],
        setValue,
        isValid,
        variant: isValid ? 'normal' : 'error',
      };
    },
    [errors, handleBlur, setFieldValue, touched, values],
  );

  const fields = useMemo(
    () =>
      keys(values).reduce(
        (prev, key) => ({
          ...prev,
          [key]: getField(key),
        }),
        {} as FormFields<FV>,
      ),
    [values, getField],
  );

  const setValueAndValidate = useCallback(
    async <K extends keyof FV>(name: K, value: FV[K]) => {
      await setFieldValue(name as string, value);
      validateField(name as string);
    },
    [setFieldValue, validateField],
  );

  const changedFields = useMemo<{ [key in keyof FV]?: boolean }>(
    () =>
      Object.entries(fields).reduce((acc, [key, field]) => {
        return {
          ...acc,
          ...(!ignoredFields?.includes(key)
            ? { [key]: field.value !== config.initialValues[key] }
            : {}),
        };
      }, {} as { [key in keyof FV]?: boolean }),
    [config.initialValues, fields, ignoredFields],
  );

  const hasChanges = useMemo(
    () => Object.values(changedFields).some(v => v),
    [changedFields],
  );

  return {
    formik,
    fields,
    hasChanges,
    changedFields,
    setValueAndValidate,
  };
}
