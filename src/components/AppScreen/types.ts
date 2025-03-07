import { ElementChildrenType } from '@app/types';
import { AppColorValue } from '@app/theme';

export type AppScreenProps = {
  children: ElementChildrenType;
  backgroundColor?: AppColorValue;
  noScroll?: boolean;
  withHeader?: boolean;
  withBottomTabs?: boolean;
  title?: string;
};
