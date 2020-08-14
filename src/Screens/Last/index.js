import React from 'react';

import { Container, DevInfo, Bold, Top, Bottom } from './styles';

export default function LastScreen() {
    return (
        <Container colors={ ['#abd1ff', '#538bcf'] } >
            <Top>
                <DevInfo>Aplicativo desenvolvido por</DevInfo>
                <Bold>Rodrigo Prestes</Bold>
            </Top>
            <Bottom>
                <DevInfo>Um repositório contendo o projeto deste aplicativo se encontra em:</DevInfo>
                <Bold>https://github.com/rodgo4k/App-Clima</Bold>
            </Bottom>
        </Container>
    );
}