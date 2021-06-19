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


const fetchData = async () => {
    return await WeatherMap.get('/data/2.5/weather', {
        params: {}
    })
}

export default function All() {

    const [isShow, setIsShow] = useState<boolean>(false);
    const [haveErr, setHaveErr] = useState<boolean>(false);
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const onSearchSubmit = async (term: string) => {
        term === '' ? setIsShow(false) : setIsShow(true);
        setLoading(true);
        setWeather(null);
        setHaveErr(false);
        return await WeatherMap.get('/data/2.5/weather', {
            params: {
                q: term,
            }
        }).then((res) => {
                setWeather(res);
                console.log(res);
                setLoading(false);
            })
            .catch((e) => {
                setHaveErr(true);
                console.log(e);
                setLoading(false);
            });
    }

    return (
        <Wrapper>
            <Header title='Weather App'/>
            <Search weather={weather} haveErr={haveErr} button='Search' onSubmit={onSearchSubmit}/>
            {isShow &&
            <Results loading={loading} weather={weather} haveErr={haveErr}/>}
        </Wrapper>

    )
}