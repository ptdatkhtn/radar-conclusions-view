import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  margin-top: 16px;
`

const BarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;

  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -6px;
    left: calc(50% - 1.5px);
    width: 3px;
    height: 18px;
    background-color: rgb(196, 196, 196);
    z-index: 1;

}

&:focus {
    outline: none;
}
`
const Line = styled.div`
  position: absolute;
  background: rgb(196, 196, 196);
  border-radius: 6px;
  height: 6px;
  width: 100%;
  z-index: 2;
`
const Circle = styled.div`
  position: absolute;
  background-color: rgb(132, 132, 132);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  left: calc(${props => props.value}%  - 10px);
  top: -35%;
  z-index: 3;
`

const AxisPreview = ({
  containerWidth,
  value
}) => {
  return (
    <Container containerWidth={containerWidth}>
      <BarContainer
      >
        <Line/>
        <Circle value={value}/>
      </BarContainer>
    </Container>
  )
}

export default AxisPreview