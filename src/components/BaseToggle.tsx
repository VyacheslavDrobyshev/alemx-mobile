import React, { FC, useState } from 'react';

import { Pressable, StyleSheet, View, Text } from 'react-native';

import SPACING from '../styles/spacing';
import COLORS from '../styles/colors';
import TYPOGRAPHY from '../styles/typography';
import scale from '../styles/scale';

type Props = {
    isEnabled: boolean;
    disabled?: boolean;
    label?: string;
    pressedOpacity?: number;
    onPress: () => void;
};

const BaseToggle: FC<Props> = (props) => {
    const {
        isEnabled,
        disabled,
        label,
        pressedOpacity = 1,
        onPress,
    } = props;

    const styles = createStyles();

    const [isPressed, setIsPressed] = useState<boolean>(false);

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                { opacity: pressed ? pressedOpacity : 1 },
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <View
                style={[
                    styles.indicatorContainer,
                    isEnabled && styles.indicatorContainerEnabled,
                    isPressed && styles.indicatorContainerPressed,
                    disabled && styles.indicatorContainerDisabled,
                ]}
            >
                <View
                    style={[
                        styles.indicator,
                        isEnabled && styles.indicatorEnabled,
                        isPressed && styles.indicatorPressed,
                        disabled && styles.indicatorDisabled,
                    ]}
                />

                {
                    (isEnabled || isPressed)
                    && !disabled
                    && <View style={styles.shadow} />
                }
            </View>

            {label && <Text style={styles.label}>{label}</Text>}
        </Pressable>
    );
};

const createStyles = () => {
    return (
        StyleSheet.create({
            container: {
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
            },
            indicatorContainer: {
                height: scale(20),
                width: scale(32),
                justifyContent: 'center',
                padding: scale(2),
                borderRadius: scale(20),
                backgroundColor: COLORS.main9,
            },
            indicatorContainerEnabled: {
                backgroundColor: COLORS.main7,
            },
            indicatorContainerPressed: {
                backgroundColor: COLORS.main7,
            },
            indicatorContainerDisabled: {
                backgroundColor: COLORS.main8,
            },
            indicator: {
                height: scale(16),
                width: scale(16),
                borderRadius: scale(16),
                backgroundColor: COLORS.base2,
            },
            indicatorEnabled: {
                backgroundColor: COLORS.base1,
            },
            indicatorPressed: {
                backgroundColor: COLORS.base1,
            },
            indicatorDisabled: {
                backgroundColor: COLORS.main9,
            },
            label: {
                marginLeft: SPACING.sm,
                color: COLORS.main1,
                ...TYPOGRAPHY.f11_Body,
            },
            shadow: {
                position: 'absolute',
                top: -scale(3),
                right: -scale(3),
                bottom: -scale(3),
                left: -scale(3),
                borderRadius: scale(32),
                borderWidth: scale(3),
                borderColor: COLORS.main10,
                backgroundColor: 'transparent',
            },
        })
    );
};

export default BaseToggle;
