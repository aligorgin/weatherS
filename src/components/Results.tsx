import styled, {css} from "styled-components";
import {faSadTear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import Words from "./Words";
import {Skeleton} from "./Skeleton";

interface Props {
    haveErr: boolean;
    weather: any;
    loading: boolean;
}

const Wrapper = styled.div`
  color: ${({theme}) => theme.colors.text};
  //box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  width: 39.5rem;
  height: 13rem;
  background-color: ${({theme}) => theme.colors.dark};
  border-radius: 5px;
  margin: 4rem auto 20rem;
  position: relative;`
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
  display: flex;
  padding: 2rem;
  .sad {
    font-size: 6rem;
    padding-right: 1.5rem;
    border-right: 2px solid ${({theme}) => theme.colors.hot};
  }
  .sad-content {
    padding: 2rem 0 0 1.5rem;
    line-height: 2rem;
  }
  .sad-content span {
    font-size: 2rem;
  }

  .sad-content:not(span) {
    font-size: 1.1rem;
    letter-spacing: 0.025rem;
  }
`
const SkeletonWrapper = styled.div`
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .circleLeft {
    align-items: flex-end;

  }

  .rects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

  }
`


export function Results({loading, haveErr, weather}: Props) {
    const [isHot, setIsHot] = useState<boolean>(false);
    useEffect(() => {
        if (weather) {
            (weather.data.main.temp - 273.15) > 31 ? setIsHot(true) : setIsHot(false);
        }
    }, [weather]);
    return (
        <Wrapper>
            {loading ?
                <SkeletonWrapper>
                    <div className='circleLeft'>
                        <Skeleton type='circle' height={110} width={110}/>
                    </div>
                    <div className='rects'>
                        <Skeleton type='rect' width={140} height={20}/>
                    </div>
                </SkeletonWrapper>
                :
                haveErr ?
                    <Error>
                        <div className='sad'>
                            <FontAwesomeIcon icon={faSadTear}/>
                        </div>
                        <div className='sad-content'>
                            <span>Sorry </span>,{Words.errorWords}
                        </div>
                    </Error>
                    :
                    <Content>
                        <Temperature isHot={isHot}>
                            {(weather.data.main.temp - 273.15).toFixed(1)}&#8451;
                        </Temperature>
                        <Details isHot={isHot}>
                            <div>Max <span
                                className='color'>&#10073;</span> {(weather.data.main.temp_max - 273.15).toFixed(1)}&#8451;
                            </div>
                            <div>Humanity <span className='color'>&#10073;</span> {weather.data.main.humidity}%</div>
                            <div>Min <span
                                className='color'>&#10073;</span> {(weather.data.main.temp_min - 273.15).toFixed(1)}&#8451;
                            </div>
                            <div>wind <span className='color'>&#10073;</span> {(weather.data.wind.speed)}m/s</div>
                        </Details>
                    </Content>
            }
        </Wrapper>
    )
}