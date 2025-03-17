import { createContext } from 'react';

import { AppToastContextType } from './types';

export const AppToastContext = createContext<AppToastContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideAll: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  show: () => () => {},
});
