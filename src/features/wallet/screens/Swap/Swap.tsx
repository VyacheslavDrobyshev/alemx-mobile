import { AppIcon, AppScreen, AppText, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { formatNumber } from '@app/utils/number';

const styles = StyleSheet.create({
  valueInput: {
    fontWeight: 700,
    fontSize: 24,
    height: 40,
    width: 150,
    textAlign: 'right',
  },
});

const SwapChangeItem = () => {
  const { colors } = useAppTheme();
  const [value, setValue] = useState(formatNumber(0));
  return (
    <AppView
      padding={15}
      height={130}
      width="100%"
      justifyContent="space-between"
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.inputBorderColor}>
      <AppView flexDirection="row" justifyContent="space-between">
        <AppText color={colors.inputLabelColor}>Pay with</AppText>
        <AppText color={colors.inputLabelColor}>{`Balance: ${formatNumber(
          23134.2342,
        )}`}</AppText>
      </AppView>
      <AppView flexDirection="row" justifyContent="space-between">
        <AppView
          borderRadius={8}
          borderWidth={1}
          borderColor={colors.inputBorderColor}
          height={40}
          width={130}
          padding={10}
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row">
          <AppView
            height={24}
            width={24}
            borderRadius={24}
            backgroundColor={colors.buttonPrimary}
          />
          <AppText textStyle="regular_14_20">USDT</AppText>
          <AppIcon name="ChevronRight" color={colors.white} />
        </AppView>
        <TextInput
          keyboardType="numeric"
          onChangeText={setValue}
          value={value.replace(',', '.').replace(' ', '')}
          style={[{ color: colors.white }, styles.valueInput]}
        />
      </AppView>
      <AppView>
        <AppText color={colors.inputLabelColor} textAlign="right">
          $2,071.00 <AppText color={colors.inputItemColor}>(-0.051%)</AppText>
        </AppText>
      </AppView>
    </AppView>
  );
};

export const SwapScreen = () => (
  <AppScreen title="Exchange">
    <AppView />
    <SwapChangeItem />
  </AppScreen>
);
