import React, {
  isValidElement,
  cloneElement,
  FC,
  useCallback,
  useMemo,
  useState,
  ReactElement,
} from 'react';
import { AppText, AppView } from '@app/walletFeature/wallet/common/components';
import { Tooltip } from '@app/walletFeature/wallet/components/AmountValue/AmountTooltip';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';

export const AmountValue: FC<{
  value: string | number;
  hideNegative?: boolean;
  Component?: ReactElement;
}> = ({ value, Component, hideNegative }) => {
  const [isTooltipShown, setIsTooltipShown] = useState(false);

  const toggleTooltip = useCallback(() => {
    setIsTooltipShown(prevState => !prevState);
  }, []);

  const closeTooltip = useCallback(() => {
    setIsTooltipShown(false);
  }, []);

  const decimals = useMemo(
    () => value.toString().split('.')[1]?.length || 3,
    [value],
  );

  const content =
    decimals >= 4
      ? `${formatNumber(Number(value), undefined, 2, 4)}...`
      : formatNumber(Number(value), undefined, 2);

  const renderedComponent = isValidElement(Component) ? (
    cloneElement(Component, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onPress: decimals >= 4 ? toggleTooltip : undefined,
      children: Number(value) >= 0 ? content : hideNegative ? '--' : content,
    })
  ) : (
    <AppText
      onPress={decimals >= 4 ? toggleTooltip : undefined}
      ellipsizeMode="middle"
      numberOfLines={1}>
      {content}
    </AppText>
  );

  return (
    <>
      {isTooltipShown && (
        <AppView top={-30} position="absolute">
          <Tooltip closeTooltip={closeTooltip} value={value.toString()} />
        </AppView>
      )}
      {renderedComponent}
    </>
  );
};
