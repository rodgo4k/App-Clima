import React from 'react';

import EntypoIcons from 'react-native-vector-icons/Entypo';

import { Button, Label } from './styles';

export default function ClimaButton({ focused }) {
    return (
        <Button
            colors={
                focused
                    ? ['#3499FF', '#3A3985']
                    : ['#6EE2F5', '#6454F0']
            }
        >
            <EntypoIcons name="light-up" size={22} color="#000" />
            <Label>Clima</Label>
        </Button>
    );
}