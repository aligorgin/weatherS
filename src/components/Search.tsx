import styled, {css, keyframes} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useState, useRef, useEffect} from "react";

interface Props {
    button: string;
    onSubmit: (term: string) => void;
    haveErr: boolean;
    weather:any;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  animation: ${fadeIn} 2s;

`
const SearchWrapper = styled.div`
  font-size: 1.2rem;
  border-bottom: 2px solid ${({theme}) => theme.colors.text};
  color: ${({theme}) => theme.colors.text};
  padding: 0 .25rem 0.25rem 0;

  ${props => props.isFocused && css`
    border-color: ${({theme}) => theme.colors.cold};
    color: ${({theme}) => theme.colors.cold};
  `}

  ${props => props.haveErr && css`
    ${props => props.isFocused && css`
      border-color: ${({theme}) => theme.colors.hot};
      color: ${({theme}) => theme.colors.hot};
    `}
  `}

  ${props => props.isHot && css`
    ${props => props.isFocused && css`
      border-color: ${({theme}) => theme.colors.hot};
      color: ${({theme}) => theme.colors.hot};
    `}
  `}

`
const Input = styled.input`
  &:focus {
    outline: none;
    border-bottom: 2px solid ${({theme}) => theme.colors.cold};
  }

  width: 40%;
  background-color: transparent;
  color: ${({theme}) => theme.colors.text};
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid ${({theme}) => theme.colors.text};
  padding: 0 0 .5rem .5rem;
  margin-right: 3rem;
  font-size: 1.4rem;

  ${props => props.haveErr && css`
    &:focus {
      border-color: ${({theme}) => theme.colors.hot};
    }
  `}

  ${props => props.isHot && css`
    &:focus {
      border-color: ${({theme}) => theme.colors.hot}
    }
  
  `}

`
const Button = styled.button`
  position: relative;
  display: inline-flex;
  padding: 0.625rem 1.9rem;
  background: ${({theme}) => theme.colors.cold};
  color: ${({theme}) => theme.colors.text};
  text-decoration: none;
  letter-spacing: 1px;
  border-width: 0;
  overflow: hidden;
  border-radius: 5px;

  ${props => props.haveErr && css`
    background: ${({theme}) => theme.colors.hot};
  `}
  ${props => props.isHot && css`
    background-color: ${({theme}) => theme.colors.hot};
  `}
  &:before {
    content: '';
    position: absolute;
    top: ${props => props.Y}px;
    left: ${props => props.X}px;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.dark};
    transition: width .5s, height .5s;
  }

  &:hover:before {
    width: 15rem;
    height: 15rem;
  }

  &:active {
    transform: scale(95%);
    transition: transform .2s;
  }

  span {
    position: relative;
    z-index: 1;
  }

`

export function Search({button, onSubmit, haveErr, weather}: Props) {

    const [isFocused, setIsFocused] = useState(false);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [city, setCity] = useState('');
    const [isHot, setIsHot] = useState(false)

    const InputEl = useRef<HTMLInputElement>(null);
    const ButtonEl = useRef<HTMLButtonElement>(null)
    const handleOnFocus = () => {
        setIsFocused(true)
    };
    const handleOnBlur = () => {
        setIsFocused(false)
    };
    const handleOnMouseMove = (e) => {
        setX(e.pageX - ButtonEl.current.offsetLeft);
        setY(e.pageY - ButtonEl.current.offsetTop);
    };
    const onInputChange = (e) => {
        setCity(e.target.value)
    }
    //gtr: communication child to parent
    const onFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(city);
    }
    //gtr:to preventing to many re-rendering
    // useEffect(() => {
    //     city == '' ? setIsEmpty(true) : setIsEmpty(false);
    // }, [city])
    useEffect(() => {
        (weather.data.main.temp - 273.15) > 31 ? setIsHot(true) : setIsHot(false);
    }, [weather])


    return (
        <form onSubmit={onFormSubmit} action="">
            <Wrapper>
                <SearchWrapper isHot={isHot} haveErr={haveErr} isFocused={isFocused}>
                    <FontAwesomeIcon icon={faSearch}/>
                </SearchWrapper>
                <Input isHot={isHot} haveErr={haveErr} ref={InputEl} maxLength={22} type='text' value={city}
                       onChange={onInputChange}
                       onFocus={handleOnFocus}
                       onBlur={handleOnBlur}
                       placeholder='City (London, New York, ...)'/>
                <Button isHot={isHot} haveErr={haveErr} ref={ButtonEl} onMouseMove={handleOnMouseMove} X={X} Y={Y}>
                <span>
                    {button}
                </span>
                </Button>
            </Wrapper>
        </form>
    )
}