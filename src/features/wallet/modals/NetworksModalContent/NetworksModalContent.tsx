import { useAppTheme } from '@app/theme';

import {
  AppIcon,
  AppText,
  AppTouchable,
  AppView,
  useAppBottomDrawer,
} from '@app/components';
import { FC, useMemo } from 'react';
import { AssetsData } from '@app/features/wallet/screens/Wallet/redux/types.ts';

type NetworkItem = {
  id: string;
  title: string;
  subTitle: string;
  onPress: (id: string) => void;
};

export const NetworkItem: FC<NetworkItem> = ({
  title,
  subTitle,
  onPress,
  id,
}) => {
  const { colors } = useAppTheme();

  return (
    <AppTouchable
      onPress={() => onPress(id)}
      width={'100%'}
      borderRadius={8}
      borderWidth={1}
      paddingVertical={10}
      flexDirection={'row'}
      borderColor={colors.inputBorderColor}>
      <AppView paddingHorizontal={10}>
        <AppIcon name={'Dollar'} color={colors.white} />
      </AppView>
      <AppView flex={1}>
        <AppText textStyle={'regular_14_20'} flexShrink={1}>
          {title} <AppText color={colors.inputLabelColor}>(TRC20)</AppText>
        </AppText>
        <AppText color={colors.inputLabelColor} textStyle={'regular_12_18'}>
          {subTitle}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};

export const NetworksModalContent: FC<{
  onPress: (network: string, item?: AssetsData) => void;
  item?: AssetsData;
}> = ({ onPress, item }) => {
  const { closeBottomDrawer } = useAppBottomDrawer();
  const { colors } = useAppTheme();

  const availableNetworks: NetworkItem[] = useMemo(() => {
    return [
      {
        id: 'Tron (TRC20)',
        title: 'Tron (TRC20)',
        subTitle: 'Min. deposit >0.01 USDT',
        onPress: (id: string) => {
          onPress?.(id, item);
          closeBottomDrawer();
        },
      },
      {
        id: 'Ethereum (ERC20)',
        title: 'Ethereum (ERC20)',
        subTitle: 'Min. deposit >0.01 USDT',
        onPress: (id: string) => {
          onPress?.(id, item);
          closeBottomDrawer();
        },
      },
    ];
  }, [closeBottomDrawer, item, onPress]);

  return (
    <>
      <AppView gap={10}>
        {availableNetworks.map(network => (
          <NetworkItem key={network.id} {...network} />
        ))}
        <AppView
          marginTop={15}
          flexDirection={'row'}
          padding={10}
          borderWidth={1}
          borderRadius={8}
          borderColor={colors.inputBorderColor}>
          <AppIcon
            marginRight={10}
            name={'Dollar'}
            color={colors.inputLabelColor}
          />
          <AppText flexShrink={1}>
            Please note that only supported networks on ALEMX platform are
            shown, if you deposit via another network your assets may be lost.
          </AppText>
        </AppView>
      </AppView>
    </>
  );
};
