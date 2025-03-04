import React, { FC, useState } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import CheckMarkIcon from '../assets/icons/check-mark.svg';

import COLORS from '../styles/colors';
import scale from '../styles/scale';

type Props = {
    isChecked: boolean;
    disabled?: boolean;
    error?: boolean;
    pressedOpacity?: number;
    onPress: () => void;
};

const BaseCheckbox: FC<Props> = (props) => {
    const {
        isChecked,
        disabled,
        error,
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
                isPressed && styles.containerPressed,
                disabled && styles.containerDisabled,
                error && styles.containerError,
                isChecked && [
                    styles.containerChecked,
                    disabled && styles.containerCheckedDisabled,
                    error && styles.containerCheckedError,
                ],
                { opacity: pressed ? pressedOpacity : 1 },
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {isChecked && <CheckMarkIcon width={scale(16)} height={scale(16)} />}
            {isPressed && <View style={styles.shadow} />}
        </Pressable>
    );
};

const createStyles = () => {
    return (
        StyleSheet.create({
            container: {
                height: scale(18),
                width: scale(18),
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: scale(1),
                borderRadius: scale(2),
                borderColor: COLORS.main9,
            },
            containerPressed: {
                borderColor: COLORS.main4,
            },
            containerDisabled: {
                borderColor: COLORS.main8,
            },
            containerError: {
                borderColor: COLORS.main5,
            },
            containerChecked: {
                borderColor: 'transparent',
                backgroundColor: COLORS.main4,
            },
            containerCheckedDisabled: {
                backgroundColor: COLORS.main8,
            },
            containerCheckedError: {
                backgroundColor: COLORS.main5,
            },
            shadow: {
                position: 'absolute',
                top: -scale(4),
                right: -scale(4),
                bottom: -scale(4),
                left: -scale(4),
                borderRadius: scale(5),
                borderWidth: scale(3),
                borderColor: COLORS.base200,
                backgroundColor: 'transparent',
            },
        })
    );
};

export default BaseCheckbox;
