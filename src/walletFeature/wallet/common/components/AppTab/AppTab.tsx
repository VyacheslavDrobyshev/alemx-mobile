import { FC, useEffect, useState } from 'react';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { AppTabProps } from '@app/walletFeature/wallet/common/components/AppTab/types';
import {
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';

export const AppTab: FC<AppTabProps> = ({ tabs, children, onTabChange }) => {
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <>
      <AppView
        borderWidth={1}
        borderColor={colors.inputBorderColor}
        borderRadius={8}
        height={40}
        width="100%"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="row"
        padding={3}
        marginVertical={12}
        backgroundColor={colors.primaryLightColor}>
        {tabs.map((item, index) => (
          <AppTouchable
            disabled={item === 'Bank cards'} // todo remove it when tab will be implemented
            key={item}
            borderRadius={4}
            onPress={() => setActiveTab(index)}
            flex={1}
            height="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor={
              index === activeTab ? colors.buttonPrimary : colors.transparent
            }>
            <AppText
              color={
                index === activeTab ? colors.white : colors.inputItemColor
              }>
              {item}
            </AppText>
          </AppTouchable>
        ))}
      </AppView>
      <AppView flex={1}>{children[activeTab]}</AppView>
    </>
  );
};
