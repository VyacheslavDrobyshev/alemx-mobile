import { AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { FC, useState } from 'react';
import { AppTabProps } from '@app/components/AppTab/types.ts';

export const AppTab: FC<AppTabProps> = ({ tabs, children }) => {
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <AppView
        borderWidth={1}
        borderColor={colors.inputBorderColor}
        borderRadius={8}
        height={40}
        width={'100%'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        flexDirection={'row'}
        padding={3}
        marginVertical={12}
        backgroundColor={colors.primaryLightColor}>
        {tabs.map((item, index) => (
          <AppTouchable
            key={item}
            borderRadius={4}
            onPress={() => setActiveTab(index)}
            flex={1}
            height={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
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
