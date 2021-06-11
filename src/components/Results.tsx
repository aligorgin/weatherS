import styled, {css} from "styled-components";
import {faSadTear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import Words from "./Words";
import WeatherIcon from "./WeatherIcon";

interface Props {
    haveErr: boolean;
    temperature: number;
    maxTemp: number;
    humidity: number;
    minTemp: number;
    wind: number;
    iconWeather:string;
}

const Wrapper = styled.div`
  color: ${({theme}) => theme.colors.text};
  width: 39.5rem;
  height: 13rem;
  background-color: ${({theme}) => theme.colors.dark};
  border-radius: 5px;
  margin: 6rem auto 20rem;
`

const Content = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`

const Temperature = styled.div`
  font-size: 4rem;
  display: inline-flex;
  padding: 1.8rem 1.6rem 1.8rem .1rem;
  border-right: 2px solid ${({theme}) => theme.colors.cold};

  ${props => props.isHot && css`
    border-color: ${({theme}) => theme.colors.hot};
  `}
`

const Details = styled.div`
  padding: .5rem 0.5rem 0.5rem 1.6rem;
  display: grid;
  flex-grow: 1;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  font-size: 1.3rem;
  align-items: center;
  white-space: nowrap;

  .color {
    color: ${({theme}) => theme.colors.cold};
  }

  ${props => props.isHot && css`
    .color {
      color: ${({theme}) => theme.colors.hot};
    }
  `}

`

const Error = styled.div`
  //color: red;
  display: flex;
  padding: 2rem;

  .sad {
    font-size: 6rem;
    padding-right: 1rem;
    border-right: 2px solid ${({theme}) => theme.colors.hot};
  }

  .sad-content {
    padding: 1rem 1rem 0 1rem;
  }

  .sad-content span {
    font-size: 2rem;
  }

  .sad-content:not(span) {
    font-size: 1.1rem;
    letter-spacing: 0.025rem;
  }
`

const IconWeather = styled.span`
  position: absolute;
  display: inline-flex;
  top: -3rem;
  left: 4rem;
`

export function Results({temperature, haveErr, minTemp, wind, humidity, maxTemp,iconWeather}: Props) {

    const [isHot, setIsHot] = useState<boolean>(false);
    useEffect(() => {
        temperature > 31 ? setIsHot(true) : setIsHot(false);
    }, [temperature]);

    // if (iconWeather){
    //     console.log(iconWeather)
    // }

    return (
        <Wrapper>
            {
                haveErr ?
                    <Error>
                        <div className='sad'>
                            <FontAwesomeIcon icon={faSadTear}/>
                        </div>
                        <div className='sad-content'>
                            <span>Sorry</span>,{Words.errorWords}
                        </div>
                    </Error>
                    :
                    <Content>
                        <IconWeather>
                            <WeatherIcon iconWeather={iconWeather}/>
                        </IconWeather>
                        <Temperature isHot={isHot}>
                            {temperature.toFixed(1)}&#8451;
                        </Temperature>
                        <Details isHot={isHot}>
                            <div>Max <span className='color'>&#10073;</span> {maxTemp.toFixed(1)}&#8451;</div>
                            <div>Humanity <span className='color'>&#10073;</span> {humidity}%</div>
                            <div>Min <span className='color'>&#10073;</span> {minTemp.toFixed(1)}&#8451;</div>
                            <div>wind <span className='color'>&#10073;</span> {wind}m/s</div>
                        </Details>
                    </Content>
            }

        </Wrapper>
    )
}