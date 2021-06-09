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

    const [isShow, setIsShow] = useState(false);
    const [haveErr, setHaveErr] = useState<boolean>(false);

    const API_key = '5950e3e0cb2c1979bed0d88c993d8296'

    const onSearchSubmit = async (term: string) => {
        console.log(term);
        term === '' ? setIsShow(false) : setIsShow(true);
        const response = await WeatherMap.get('/data/2.5/weather', {
            params: {
                q: term,
                appid: API_key
            }
        }).catch(() => {
            setHaveErr(true)
        });

        if (response){
            setHaveErr(false);
        }
    }

    return (
        <Wrapper>
            <Header title='Weather App'/>
            <Search haveErr={haveErr} button='Search' onSubmit={onSearchSubmit}/>
            {isShow && <Results haveErr={haveErr} temperature={75}/>}
        </Wrapper>

    )
}