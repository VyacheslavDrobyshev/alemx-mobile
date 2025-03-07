import { useContext } from 'react';

import { AppModalContext } from './contexts';

export const useAppModal = () => useContext(AppModalContext);
