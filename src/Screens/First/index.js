/* eslint-disable prettier/prettier */
import React, { Fragment, useState, useEffect } from 'react';
import axios  from 'axios';
import { View, Text, PermissionsAndroid } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export default function FirstScreen() {

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
                </View>
            </Fragment>
            );
    }
}
