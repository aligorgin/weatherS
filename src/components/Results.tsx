import styled from "styled-components";

const Wrapper = styled.div`
  color: ${({theme}) => theme.colors.text};
  width: 39.5rem;
  height: 13rem;
  background-color: ${({theme}) => theme.colors.dark};
  border-radius: 5px;
  margin: 4rem auto 0;
`

const Content = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  display: flex;
`

const Temperature = styled.div`
  font-size: 4rem;
  display: inline-flex;
  padding: 1.8rem 1.6rem 1.8rem 1rem;
  border-right: 2px solid ${({theme}) => theme.colors.cold};
`

const Details = styled.div`
  padding: .5rem 0.5rem 0.5rem 1.5rem;
  display: grid;
  flex-grow: 1;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  font-size: 1.3rem;
`

export function Results() {
    return (
        <Wrapper>
            <Content>
                <Temperature>
                    21&#8451;
                </Temperature>
                <Details>
                    <div>humanity:434</div>
                    <div>humanity:654</div>
                    <div>humanity:23</div>
                    <div>humanity:43</div>
                </Details>
            </Content>
        </Wrapper>
    )
}