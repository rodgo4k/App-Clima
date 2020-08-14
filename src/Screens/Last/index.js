/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';

import { Container, TopBar } from './styles';

import Weather from '../../components/Weather';

export default function LastScreen() {
    return (
        <Container colors={ ['#abd1ff', '#538bcf'] } >
            <TopBar>
                <Weather />
                <Text>g</Text>
            </TopBar>
        </Container>
    );
}