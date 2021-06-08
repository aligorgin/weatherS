import {Header} from "../components/Header";
import styled from "styled-components";
import {Search} from "../components/Search";
import {Results} from "../components/Results";
import {useState} from "react";

const Wrapper = styled.div`
  width: 45rem;
  margin: 0 auto;
`

export default function All() {

    const [isShow, setIsShow] = useState(false);

    const onSearchSubmit = (term: string) => {
        console.log(term);
        setIsShow(true)
    }

    return (
        <Wrapper>
            <Header title='Weather App'/>
            <Search button='Search' onSubmit={onSearchSubmit}/>
            {isShow && <Results temperature={75}/>}
        </Wrapper>

    )
}