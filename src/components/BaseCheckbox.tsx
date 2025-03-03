import React, { FC, useState } from 'react';

import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import CheckMarkIcon from '../assets/icons/check-mark.svg';

import COLORS from '../styles/colors';
import scale from '../styles/scale';

type Props = {
    isChecked: boolean;
    disabled?: boolean;
    error?: boolean;
    pressedOpacity?: number;
    containerStyles?: StyleProp<ViewStyle>;
    containerCheckedStyles?: StyleProp<ViewStyle>;
    containerPressedStyles?: StyleProp<ViewStyle>;
    containerDisabledStyles?: StyleProp<ViewStyle>;
    containerErrorStyles?: StyleProp<ViewStyle>;
    shadowStyles?: StyleProp<ViewStyle>;
    onPress: () => void;
};

const BaseCheckbox: FC<Props> = (props) => {
    const {
        isChecked,
        disabled,
        error,
        pressedOpacity = 1,
        containerStyles,
        containerCheckedStyles,
        containerPressedStyles,
        containerDisabledStyles,
        containerErrorStyles,
        shadowStyles,
        onPress,
    } = props;

    const styles = createStyles(isChecked);

    const [isPressed, setIsPressed] = useState<boolean>(false);

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                containerStyles,
                isChecked && [styles.containerChecked, containerCheckedStyles],
                isPressed && [styles.containerPressed, containerPressedStyles],
                disabled && [styles.containerDisabled, containerDisabledStyles],
                error && [styles.containerError, containerErrorStyles],
                { opacity: pressed ? pressedOpacity : 1 },
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {isChecked && <CheckMarkIcon width={scale(16)} height={scale(16)} />}

            {
                isPressed && (
                    <View
                        style={[
                            styles.shadow,
                            shadowStyles,
                        ]}
                    />
                )
            }
        </Pressable>
    );
};

const createStyles = (isChecked: boolean) => {
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
            containerChecked: {
                borderWidth: 0,
                backgroundColor: COLORS.main4,
            },
            containerPressed: {
                borderColor: COLORS.main4,
            },
            containerDisabled: {
                borderColor: COLORS.main8,
                backgroundColor: isChecked ? COLORS.main8 : 'transparent'
            },
            containerError: {
                borderColor: COLORS.main5,
                backgroundColor: isChecked ? COLORS.main5 : 'transparent',
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
