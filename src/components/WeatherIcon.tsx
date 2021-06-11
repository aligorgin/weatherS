import {useEffect} from "react";
import {WiDaySunny} from 'weather-icons-react';
import styled from "styled-components";


interface Props {
    iconWeather: string;
}

const Icon = styled.div`
  font-size: 5rem;
`

const WeatherIcon = ({iconWeather}: Props) => {



    useEffect(() => {
        let x = 0;
        switch (iconWeather) {
            case '01d':
                x = 1;
                break;
            case '02d':
                x=2;
                break;
            case '03d':
                x=3;
                break;
            case '04d':
                x=4;
                break;
            case '09d':
                x=9;
                break;
            case '10d':
                x=10;
                break;
            case '11d':
                x=11;
                break;
            case '13d':
                x=13;
                break;
            default:
                x=50;
        }
    }, [iconWeather])

    return (
        <Icon>
            <WiDaySunny/>
        </Icon>
    )
}

export default WeatherIcon;