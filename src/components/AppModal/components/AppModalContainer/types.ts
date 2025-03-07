import { ElementChildrenType } from '@app/types';
import { AppViewProps } from '@app/components/AppView/types';

import { AppModalType } from '../../constants';

export type AppModalContainerProps = {
  children: ElementChildrenType;
  type: AppModalType.Container;
  safeTop?: boolean;
  safeBottom?: boolean;
  justifyContent?: AppViewProps['justifyContent'];
  alignItems?: AppViewProps['alignItems'];
};
