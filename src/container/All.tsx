import {Header} from "../components/Header";
import styled from "styled-components";
import {Search} from "../components/Search";
import {Results} from "../components/Results";
import {useState} from "react";
import WeatherMap from '../api/WeatherMap';

const Wrapper = styled.div`
  width: 45rem;
  margin: 0 auto;
`

export default function All() {

    const [isShow, setIsShow] = useState<boolean>(false);
    const [haveErr, setHaveErr] = useState<boolean>(false);
    const [temperature, setTemperature] = useState<number>(0);
    const [maxTemp, setMaxTemp] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [minTemp, setMinTemp] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);


    const onSearchSubmit = async (term: string) => {
        console.log(term);
        term === '' ? setIsShow(false) : setIsShow(true);
        const response = await WeatherMap.get('/data/2.5/weather', {
            params: {
                q: term,
            }
        }).catch(() => {
            setHaveErr(true)
        });

        if (response) {
            setHaveErr(false);
            console.log(response);
            setTemperature(response.data.main.temp - 273.15);
            setMaxTemp((response.data.main.temp_max - 273.15));
            setHumidity(response.data.main.humidity);
            setMinTemp(response.data.main.temp_min - 273.15);
            setWind(response.data.wind.speed)
        }
    }

    return (
        <Wrapper>
            <Header title='Weather App'/>
            <Search haveErr={haveErr} button='Search' onSubmit={onSearchSubmit}/>
            {isShow &&
            <Results maxTemp={maxTemp} humidity={humidity} minTemp={minTemp} wind={wind} haveErr={haveErr}
                     temperature={temperature}/>}
        </Wrapper>

    )
}