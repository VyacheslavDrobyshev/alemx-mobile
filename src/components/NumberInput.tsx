import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import Icon from './Icon';

import SPACING from '../styles/spacing';
import COLORS from '../styles/colors';
import TYPOGRAPHY from '../styles/typography';
import scale from '../styles/scale';

type Props = {
    disabled?: boolean;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    error?: string;
    label?: string;
    caption?: string;
    pressedOpacity?: number;
};

const NumberInput: FC<Props> = (props) => {
    const {
        disabled,
        value,
        setValue,
        error,
        label,
        caption,
        pressedOpacity = 1,
    } = props;

    const styles = createStyles();
    
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onPressIncrease = () => setValue((prevValue) => prevValue + 1);
    const onPressDecrease = () => setValue((prevValue) => prevValue - 1);

    const onLongPressIncrease = useCallback(() => {
        const intervalId = setInterval(() => {
            setValue((prevValue) => prevValue + 1);
        }, 100);

        return intervalId;
    }, []);

    const onLongPressDecrease = useCallback(() => {
        const intervalId = setInterval(() => {
            setValue((prevValue) => prevValue - 1);
        }, 100);
        
        return intervalId;
    }, []);

    const stopLongPress = (intervalId: NodeJS.Timeout) => {
        clearInterval(intervalId);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.inputContainer,
                    error && styles.inputErrorContainer,
                    isFocused && styles.inputFocusedContainer,
                    disabled && styles.inputDisabledContainer,
                ]}
            >
                <Pressable
                    disabled={disabled}
                    style={({ pressed }) => [
                        { opacity: pressed ? pressedOpacity : 1 },
                    ]} 
                    onPress={onPressIncrease}
                    onPressIn={() => setIsFocused(true)}
                    onPressOut={() => setIsFocused(false)}
                    onLongPress={() => stopLongPress(onLongPressIncrease())} 
                    delayLongPress={300}
                >
                    <Icon
                        name='minus'
                        fill={disabled && COLORS.main9}
                    />
                </Pressable>

                <Text
                    style={[
                        styles.number,
                        disabled && styles.numberDisabled,
                    ]}
                >
                    {value}
                </Text>

                <Pressable
                    disabled={disabled}
                    style={({ pressed }) => [
                        { opacity: pressed ? pressedOpacity : 1 },
                    ]} 
                    onPress={onPressDecrease}
                    onPressIn={() => setIsFocused(true)}
                    onPressOut={() => setIsFocused(false)}
                    onLongPress={() => stopLongPress(onLongPressDecrease())} 
                    delayLongPress={300}
                >
                    <Icon
                        name='plus'
                        fill={disabled && COLORS.main9}
                    />
                </Pressable>
            </View>

            {
                error && !disabled
                ? <Text style={styles.errorText}>{error}</Text>
                : caption
                ? <Text style={styles.caption}>{caption}</Text>
                : null
            }
        </View>
    );
};

const createStyles = () => {
    return (
        StyleSheet.create({
            container: {
                alignSelf: 'flex-start',
            },
            label: {
                marginBottom: SPACING.sm,
                color: COLORS.main2,
                ...TYPOGRAPHY.f11_Body,
            },
            inputContainer: {
                height: scale(40),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: SPACING.md,
                borderRadius: scale(8),
                borderWidth: scale(1),
                borderColor: 'transparent',
                backgroundColor: COLORS.base2,
            },
            inputErrorContainer: {
                borderColor: COLORS.main5,
                backgroundColor: 'transparent',
            },
            inputFocusedContainer: {
                borderColor: COLORS.main11,
                backgroundColor: 'transparent',
            },
            inputDisabledContainer: {
                borderColor: 'transparent',
                backgroundColor: COLORS.base2,
            },
            number: {
                paddingHorizontal: SPACING.md,
                color: COLORS.main1,
                ...TYPOGRAPHY.f10_Body,
            },
            numberDisabled: {
                color: COLORS.main9,
            },
            caption: {
                marginTop: SPACING.sm,
                color: COLORS.main2,
                ...TYPOGRAPHY.f13_Body,
            },
            errorText: {
                marginTop: SPACING.sm,
                color: COLORS.main5,
                ...TYPOGRAPHY.f13_Body,
            },
        })
    );
};

export default NumberInput;
