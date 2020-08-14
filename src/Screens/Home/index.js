import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { PermissionsAndroid } from 'react-native';

import { Container, Loading, WeatherMain, WeatherContainer, WeatherTemp, WeatherTempType, CityContainer, City,
        WeatherInfo, Left, Right, Info, DescriptionContainer, Description, AttButton, Att } from './styles';

import Geolocation from 'react-native-geolocation-service';

export default function HomeScreen() {

    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userPosition, setUserPosition] = useState(false);
    const [weather, setWeather] = useState(false);

    const latitu = userPosition.lat;
    const longitu = userPosition.lon;

    const weatherString = `http://api.openweathermap.org/data/2.5/weather?lat=${latitu}&lon=${longitu}&appid=8f3e9474879ac44bde61db21d6a82f79`;

    let getWeather = async (lat, long) => {
        let res = await axios.get(weatherString, {
          params: {
            lat: lat,
            lon: long,
            appid: process.env.OPEN_WHEATHER_KEY,
            lang: 'pt',
            units: 'metric',
          },
        });
        setWeather(res.data);
    }

    async function verifyLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('permissao concedida');
                setHasLocationPermission(true);
            } else {
                console.error('permissao negada');
                setHasLocationPermission(false);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        verifyLocationPermission();

        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                position => {
                    setUserPosition({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                    getWeather();
                    // setUserPosition(true);
                },
                error => {
                    console.log(error.code, error.message);
                }
            );
        }
    }, [hasLocationPermission]);

    if (userPosition === false){
        return (
            <Container colors={ ['#abd1ff', '#538bcf'] } >
                <Loading>Localização não habilitada</Loading>
            </Container>
        )
    } else if (weather === false) {
        return (
            <Container colors={ ['#abd1ff', '#538bcf'] } >
                <Loading>Carregando o clima...</Loading>
                <AttButton onClick={getWeather()} >
                    <Att>Atualizar</Att>
                </AttButton>
            </Container>
        )
    } else {
        return (
            <Container colors={ ['#abd1ff', '#538bcf'] } >
                <WeatherMain>
                    <WeatherContainer>
                        <WeatherTemp>{weather.main.temp}</WeatherTemp>
                        <WeatherTempType>°C</WeatherTempType>
                    </WeatherContainer>
                    <CityContainer>
                        <City>{weather.name}</City>
                    </CityContainer>
                </WeatherMain>

                <DescriptionContainer>
                    <Description>{weather.weather[0].description}</Description>
                </DescriptionContainer>

                <WeatherInfo>
                    <Left>
                        <Info>Sensação: {weather.main.feels_like}°C</Info>
                        <Info>Umidade do ar: {weather.main.humidity}%</Info>
                        <Info>Pressão: {weather.main.pressure} hpa</Info>
                    </Left>
                    <Right>
                        <Info>Máx: {weather.main.temp_max}°C</Info>
                        <Info>Mín: {weather.main.temp_min}°C</Info>
                        <Info>Vento: {weather.wind.speed} km/h</Info>
                    </Right>
                </WeatherInfo>
                <AttButton onClick={getWeather()} >
                    <Att>Atualizar</Att>
                </AttButton>
            </Container>
            );
    }
}
