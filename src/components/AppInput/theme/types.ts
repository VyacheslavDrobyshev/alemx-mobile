import { AppColorValue } from '@app/theme/types';
import { AppTextStyleName } from '@app/components/AppText/theme/types';

export type InputTheme = {
  textStyle: AppTextStyleName;
  container: {
    height: number;
    backgroundColor: AppColorValue;
    borderWidth: number;
    borderRadius: number;
    paddingVertical: number;
    paddingHorizontal: number;
    marginBottom: number;
  };
  error: {
    borderColor: AppColorValue;
  };
  disabled: {
    borderColor: AppColorValue;
    color: AppColorValue;
  };
  default: {
    borderColor: AppColorValue;
  };
  filled: {
    borderColor: AppColorValue;
  };
  active: {
    borderColor: AppColorValue;
  };
  placeholder: {
    color: AppColorValue;
    marginBottom: number;
  };
  errorMessage: {
    backgroundColor: AppColorValue;
    color: AppColorValue;
  };
};
