import styled from "styled-components";

interface Props {
    title: string;
}

const Title = styled.h1`
  margin-top: 2rem;
  color: ${({theme}) => theme.colors.text};
  text-align: center;
`

export function Header({title}: Props) {
    return (
        <Title>
            {title}
        </Title>
    )
}