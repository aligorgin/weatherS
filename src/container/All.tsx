import {Header} from "../components/Header";
import styled from "styled-components";
import {Search} from "../components/Search";
import {Results} from "../components/Results";
import {useState} from "react";
import WeatherMap from '../api/WeatherMap';

const Wrapper = styled.div`
    height: 900px;
    overflow-y: hidden;
`

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
                setLoading(false);
            })
            .catch((e) => {
                setHaveErr(true);
                setLoading(false);
                console.log(e);
            });
    }

    return (
        <Wrapper>
            <Header title='Weather dude'/>
            <Search weather={weather} haveErr={haveErr} button='Search' onSubmit={onSearchSubmit}/>
            {isShow &&
            <Results loading={loading} weather={weather} haveErr={haveErr}/>}
        </Wrapper>
    )
}