import { AppImageProps, AppImageSourceProps } from './types';

export const isRequireSourceProps = (
  props: AppImageProps,
): props is AppImageSourceProps => !!(props as AppImageSourceProps).source;
