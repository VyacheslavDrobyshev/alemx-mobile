import React, { FC } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import COLORS from '../styles/colors';
import TYPOGRAPHY from '../styles/typography';
import scale from '../styles/scale';

type Props = {
    color: 'yellow' | 'red' | 'green';
    placeholder: string;
};

const Badge: FC<Props> = (props) => {
    const {
        color,
        placeholder,
    } = props;

    const styles = createStyles();

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor:
                        color === 'yellow'
                        ? COLORS.main12
                        : color === 'red'
                        ? COLORS.main5
                        : COLORS.main7,
                },
            ]}
        >
            <Text style={styles.placeholder}>{placeholder}</Text>
        </View>
    );
};

const createStyles = () => {
    return (
        StyleSheet.create({
            container: {
                height: scale(20),
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: scale(4),
                borderRadius: scale(4),
                borderWidth: scale(1),
            },
            placeholder: {
                color: COLORS.main2,
                ...TYPOGRAPHY.f15_Body,
            },
        })
    );
};

export default Badge;
