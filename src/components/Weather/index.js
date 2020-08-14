/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { View, Text, PermissionsAndroid } from 'react-native';

import { WeatherContainer, City, WeatherShow } from './styles';

import Geolocation from 'react-native-geolocation-service';

const Weather = () => {

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
            <View>
                <Text>Localização não habilitada</Text>
            </View>
        )
    } else if (weather === false) {
        return (
            <View>
                <Text>Carregando o clima...</Text>
            </View>
        )
    } else {
        return (
          <WeatherContainer>
            <City>{weather.name}</City>
            <WeatherShow>{weather.main.temp}°C</WeatherShow>
          </WeatherContainer>
            );
    }
}

// const Weather = () => {
//     return (
//       <WeatherContainer>
//         <City>Ponta Grossa</City>
//         <WeatherShow>20°C</WeatherShow>
//       </WeatherContainer>
//     );
//   };

export default Weather;
