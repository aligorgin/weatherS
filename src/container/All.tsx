import {Header} from "../components/Header";
import styled from "styled-components";
import {Search} from "../components/Search";
import {Results} from "../components/Results";
import {useEffect, useState} from "react";
import WeatherMap from '../api/WeatherMap';

const Wrapper = styled.div`
  width: 45rem;
  margin: 0 auto;
`

export default function All() {

    const [isShow, setIsShow] = useState<boolean>(false);
    const [haveErr, setHaveErr] = useState<boolean>(false);
    const [weather, setWeather] = useState(null);
    const [submitted, setSubmitted] = useState<number>(1);

    useEffect(() => {
        const onSearchSubmit = async (term: string) => {
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
                setWeather(response);
                setSubmitted(submitted + 1);
            }
        }

    }, [submitted])


    console.log(weather);

    return (
        <Wrapper>
            <Header title='Weather App'/>
            <Search weather={weather} haveErr={haveErr} button='Search' onSubmit={onSearchSubmit}/>
            {isShow &&
            <Results weather={weather} haveErr={haveErr}/>}
        </Wrapper>

    )
}