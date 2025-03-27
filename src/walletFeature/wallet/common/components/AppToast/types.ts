import { AppTextProps } from '../AppText/types';
import { AppViewProps } from '../AppView/types';

export type AppToastMessage = {
  message: string;
  type: 'error' | 'success';
  autoHide?: boolean;
};

export type AppToastContextType = {
  show: (options: AppToastMessage) => () => void;
  hideAll: () => void;
};

export type AppToastStylingProps = {
  text: AppTextProps;
  view: AppViewProps;
};
