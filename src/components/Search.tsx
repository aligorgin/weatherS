import styled, {css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useState, useRef, useEffect} from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;

`

const SearchWrapper = styled.div`
  font-size: 1.2rem;
  border-bottom: 2px solid ${({theme}) => theme.colors.text};
  color: ${({theme}) => theme.colors.text};
  padding: 0 .25rem 0 0;
  ${props => props.isFocused && css`
    border-bottom: 2px solid ${({theme}) => theme.colors.cold};
    color: ${({theme}) => theme.colors.cold};
  `
  }
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
  padding: 0 0 .25rem .5rem;
  margin-right: 3rem;
  font-size: 1.4rem;
`

const Button = styled.button`
  position: relative;
  display: inline-flex;
  padding: 0.625rem 1.9rem;
  background: ${({theme}) => theme.colors.dark};
  color: ${({theme}) => theme.colors.text};
  text-decoration: none;
  letter-spacing: 1px;
  border-width: 0;
  overflow: hidden;
  border-radius: 5px;

  &:before {
    content: '';
    position: absolute;
    top: ${props => props.Y}px;
    left: ${props => props.X}px;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.cold};
    transition: width .5s, height .5s;
  }

  &:hover:before {
    width: 15rem;
    height: 15rem;
  }

  &:active{
    transform: scale(95%);
    transition: transform .2s;
  }

  span {
    position: relative;
    z-index: 1;
  }

`

export function Search() {

    const [isFocused, setIsFocused] = useState(false);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);

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

    return (
        <Wrapper>
            <SearchWrapper isFocused={isFocused}>
                <FontAwesomeIcon icon={faSearch}/>
            </SearchWrapper>
            <Input ref={InputEl} type='text' onFocus={handleOnFocus} onBlur={handleOnBlur} placeholder='city..'/>
            <Button ref={ButtonEl} onMouseEnter={handleOnMouseMove} X={X} Y={Y}>
                <span>
                    Search
                </span>
            </Button>
        </Wrapper>
    )
}