/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient)`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Loading = styled.Text`
    font-size: 20px;
    color: rgba(255, 255, 255, 0.7);
`;

export const WeatherMain = styled.View`

`;

export const WeatherContainer = styled.View`
    display: flex;
    flex-direction: row;
`;

export const WeatherTemp = styled.Text`
    font-size: 70px;
    font-weight: 500;
    color: #fff;
    opacity: 0.9;
`;

export const WeatherTempType = styled.Text`
    font-size: 20px;
    margin-top: 17px;
    color: #fff;
    opacity: 0.6;
`;

export const CityContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: -10px;
`;

export const City = styled.Text`
    font-size: 20px;
    color: #fff;
    opacity: 0.9;
`;

export const DescriptionContainer = styled.View`
    margin-top: 10px;
    margin-bottom: 5px;
`;

export const Description = styled.Text`
    text-transform: capitalize;
    font-size: 15px;
    color: #fff;
    opacity: 0.6;
`;

export const WeatherInfo = styled.View`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    padding: -35px;
    align-items: center;
    justify-content: space-between;
`;

export const Left = styled.View`
    align-items: flex-start;
    margin-right: 30px;
`;

export const Right = styled.View`
    align-items: flex-end;
    margin-left: 30px;
`;

export const Info = styled.Text`
    color: #fff;
    opacity: 0.6;
`;

export const AttButton = styled.TouchableOpacity`
    margin-top: 30px;
    background: transparent;
    height: 50px;
    width: 200px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 25px;
    align-items: center;
    justify-content: center;
`;

export const Att = styled.Text`
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
`;
