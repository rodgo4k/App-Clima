/* eslint-disable prettier/prettier */

const API_URL = 'https://swapi.dev/api/';
const API_WEATHER = 'api.openweathermap.org/data/2.5/weather?';

export const doGet = (path) => {
    const url = `${API_URL}${path}`;
    return fetch(url).then(response => response.json());
};

export const getIdFromUrl = (url) => {
    const matches = url.match(/\/([0-9]{1,})\//);
    return matches && matches[1] ? matches[1] : null;
};

export const getWeatherStr = (lat, lon) => {
    const url_weather = `${API_WEATHER}lat=${lat}&lon=${lon}&appid=3d23291b9b2ad36032cfd244a607f2fa`;
    return fetch(url_weather).then(response => response.json());
};
