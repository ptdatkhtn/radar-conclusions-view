import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`
export const WildCardWrapper = styled.div`

`

export const WildCard = styled.h4`
  display: block;
  position: relative;
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.5;
  min-height: 25px;
  padding-left: 25px;
  padding-top: 0;

  &:before {
    background:${props => props.symbol};
    border: 1px solid ${props => props.symbolBorder};
    box-shadow: inset 0px 0px 1px 1px ${props => props.symbolBoxShadow};
    display: block;
    position: absolute;
    left: 0;
    top: 4px;
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 100%;
  }
`

export const VoteWrapper = styled.div`
  width: 86px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 21px;
  right: 60px;
`

export const ButtonGroup = styled.div`
    display: flex;
    width: 70px;
    justify-content: space-between;
`

export const ButtonVote = styled.div`
    display: flex;
    flex-direction: row;
    width: 23px;
    cursor: pointer;
`

export const VoteIcon= styled.div`
  padding-top: 1px;
`

export const TriangleUp = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  margin: 2px auto;
  border-width: 0 6px 7px 6px;
  border-color: transparent transparent #969696 transparent;

  &.active {
    border-color: transparent transparent #00c3ff transparent;
  }
`

export const LineUp = styled.div`
    border-left: 4px solid #969696;
    height: 6px;
    position: relative;
    left: 4px;
    top: -3px;

    &.active {
        border-left: 4px solid #00c3ff;
    }
`

export const TriangleDown = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  margin: 2px auto;
  border-width: 7px 6px 0px 6px;
  border-color: #969696 transparent transparent transparent;

  &.active {
    border-color: #00c3ff transparent transparent transparent;
  }
`

export const LineDown = styled.div`
    border-left: 4px solid #969696;
    height: 6px;
    position: relative;
    left: 4px;
    top: 3px;

    &.active {
        border-left: 4px solid #00c3ff;
    }
`

export const VoteAmountResult = styled.div`
    font-size: 14px;  
`

export const VoteAmountItem = styled.div`
    font-size: 14px;  
`