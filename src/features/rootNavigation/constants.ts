import { FC } from 'react';

export const noHeaderOptions = { headerShown: false };

export const noGestureOptions = { gestureEnabled: false };

export const noHeaderNoGestureOptions = {
  ...noHeaderOptions,
  ...noGestureOptions,
};

export const transparentModalOptions = {
  presentation: 'transparentModal',
} as const;

export const TemporaryScreenStub: FC = () => null;
