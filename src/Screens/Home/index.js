/* eslint-disable prettier/prettier */
import React, { Fragment, useState, useEffect } from 'react';
import axios  from 'axios';
import { View, Text, PermissionsAndroid } from 'react-native';

import { Container, WeatherMain, WeatherContainer, WeatherTemp, WeatherTempType, CityContainer, City,
        WeatherInfo, Left, Right, Info, DescriptionContainer, Description } from './styles';

import Geolocation from 'react-native-geolocation-service';

import getWeatherStr from '../../helpers/ApiHelpers';

export default function FirstScreen() {

    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userPosition, setUserPosition] = useState(false);
    const [weather, setWeather] = useState(false);

    const lati = userPosition.lat;
    const lon = (userPosition.lon).then(response => response.text());

    const firstPartString = 'http://api.openweathermap.org/data/2.5/weather?lat=';
    const middlePartString = '&lon=';
    const lastPartString = '&appid=3d23291b9b2ad36032cfd244a607f2fa';

    const stringString = firstPartString + lati + middlePartString + lon + lastPartString;

    const weatherString = 'http://api.openweathermap.org/data/2.5/weather?lat=-25.1351135135135133&lon=-50.15462179615027&appid=3d23291b9b2ad36032cfd244a607f2fa';

    // if (weather === true) {
    //     return (
    //       <Fragment>
    //         <Text>Carregando o clima...</Text>
    //       </Fragment>
    //     )
    // }

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
                    getWeather(setUserPosition);
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
            <View>
                <Text>Localização não habilitada</Text>
            </View>
        )
    } else if (weather === false) {
        return (
          <Fragment>
            <Text>Carregando o clima...</Text>
          </Fragment>
        )
    } else {
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
        
        return (
            <Container colors={ ['#abd1ff', '#538bcf'] } >
                <WeatherMain>
                    <WeatherContainer>
                        <WeatherTemp>{weather.main.temp}</WeatherTemp>
                        <WeatherTempType>°C</WeatherTempType>
                    </WeatherContainer>
                    <CityContainer>
                        <City>{weather.name} {stringString}</City>
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
            </Container>
            );
    }
}
