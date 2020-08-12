/* eslint-disable prettier/prettier */
import React, { Fragment, useState, useEffect } from 'react';
import axios  from 'axios';
import { View, Text, PermissionsAndroid } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export default function FirstScreen() {

    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userPosition, setUserPosition] = useState(false);
    const [weather, setWeather] = useState(false);

    const lati = userPosition.lat;
    const lon = userPosition.lon;

    const stri = () => {
        const stringW = `phttp://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${lon}&appid=3d23291b9b2ad36032cfd244a607f2fa`;
        return stringW;
    };

    const weatherString = 'http://api.openweathermap.org/data/2.5/weather?lat=-25.1351135135135133&lon=-50.15462179615027&appid=3d23291b9b2ad36032cfd244a607f2fa';

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
        return (
            <Fragment>
              <Text>Clima nas suas Coordenadas: {weather.weather[0].description}</Text>
                <View>
                    <Text>Temperatura atual: {weather.main.temp}°</Text>
                    <Text>Sensação térmica: {weather.main.feels_like}°</Text>
                    <Text>Pressão: {weather.main.pressure} hpa</Text>
                    <Text>Umidade: {weather.main.humidity}%</Text>
                    <Text>lat {userPosition.lat}</Text>
                    <Text>lon {userPosition.lon}</Text>
                    <Text>lon {lati}</Text>
                    <Text>lon {lon}</Text>
                </View>
            </Fragment>
            );
    }
}
