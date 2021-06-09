import styled, {keyframes} from "styled-components";

interface Props {
    title: string;
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

const Title = styled.h1`
  margin-top: 2rem;
  color: ${({theme}) => theme.colors.text};
  text-align: center;
  font-size: 3rem;
  animation: ${fadeIn} 1s ;
  cursor: pointer;
`

export function Header({title}: Props) {
    return (
        <Title>
            {title}
        </Title>
    )
}