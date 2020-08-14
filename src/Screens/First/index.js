import React from 'react';

import { Container, DevInfo, Bold } from './styles';

export default function LastScreen() {
    return (
        <Container colors={ ['#abd1ff', '#538bcf'] } >
            <DevInfo>
                Esse aplicativo foi desenvolvido com a tecnologia <Bold>React Native</Bold>, 
                usando a API do Open Weather, que se encontra em <Bold>openweathermap.org</Bold>. 
                O aplicativo acessa a localização do dispositivo e através de suas coordenadas exibe, 
                em tempo real, informações sobre o clima no local.
            </DevInfo>
        </Container>
    );
}