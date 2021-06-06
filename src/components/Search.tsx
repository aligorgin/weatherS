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
;

  &:focus-within ${Wrapper} .div {
    color: red;
  }

  background-color: transparent;
  color: ${({theme}) => theme.colors.text};
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid ${({theme}) => theme.colors.text};
  padding: 0 0 .5rem .5rem;
  margin-right: 3rem;
  font-size: 1.125rem;
`

const Button = styled.button`

`

export function Search() {

    const [isFocused, setIsFocused] = useState(false);
    const InputEl = useRef<HTMLInputElement>(null);

    const handleOnFocus = () => {
        setIsFocused(true)
    }

    const handleOnBlur = () => {
        setIsFocused(false)
    }

    return (
        <Wrapper>
            <SearchWrapper isFocused={isFocused}>
                <FontAwesomeIcon icon={faSearch}/>
            </SearchWrapper>
            <Input ref={InputEl} type='text' onFocus={handleOnFocus} onBlur={handleOnBlur}/>
            <Button>Search</Button>
        </Wrapper>
    )
}