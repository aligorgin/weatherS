import styled from "styled-components";

interface Props {
    type: string;
    width: number;
    height: number;
}

const Circle = styled.div`
  width: ${({width}) => width + `px`};
  height: ${({height}) => height + `px`};
  border-radius: 50%;
  background-color: ${({theme})=>theme.colors.skeleton};
`

const Rect = styled.div`
  width: ${({width}) => width + `px`};
  height: ${({height}) => height + `px`};
  background-color: ${({theme})=>theme.colors.skeleton};
`

export function Skeleton({type,width,height}: Props): any {
    const CircleSkeleton = () => <Circle width={width} height={height}/>;
    const RectSkeleton = () => <Rect width={width} height={height}/>
    if (type === 'circle') return <CircleSkeleton/>;
    if (type === 'rect') return Array(4).fill(<RectSkeleton/>);
}