import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

type Props = {
    label?: string;
    minValue: number;
    maxValue: number;
    step?: number;
    setValue: Dispatch<SetStateAction<number>>;
};
// TO DO
const RangeSlider: FC<Props> = (props) => {
    const {
        label,
        minValue = 0,
        maxValue = 100,
        step = 1,
        // setValue,
    } = props;

    const [value, setValue] = useState(minValue);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Slider
                style={styles.slider}
                minimumValue={minValue}
                maximumValue={maxValue}
                step={step}
                value={value}
                onValueChange={setValue}
                minimumTrackTintColor="#1E90FF"
                maximumTrackTintColor="#D3D3D3"
                thumbTintColor="#1E90FF"
            />

            <View style={styles.rangeLabels}>
                <Text style={styles.rangeText}>{minValue}</Text>
                <Text style={styles.rangeText}>{maxValue}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    rangeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    rangeText: {
        fontSize: 14,
        color: '#555',
    },
});

export default RangeSlider;
