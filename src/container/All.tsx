import {Header} from "../components/Header";
import styled from "styled-components";
import {Search} from "../components/Search";
import {Results} from "../components/Results";

const Wrapper = styled.div`
  width: 45rem;
  margin: 0 auto;
`

export default function All(){
    return(
        <Wrapper>
            <Header title='Weather App'/>
            <Search button='Search'/>
            <Results/>
        </Wrapper>

    )
}