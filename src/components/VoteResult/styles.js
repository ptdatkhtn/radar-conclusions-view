import styled from "styled-components/macro";
import * as tokens from "@sangre-fp/css-framework/tokens/fp-design-tokens"

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  // align-items: center;
  padding-bottom: 4px;
`
export const WildCardWrapper = styled.div`
  width: 50%;
  @media (min-width: 768px) {
    width: 65%;
  }
  :hover {
    cursor:pointer;
  }
`

export const WildCard = styled.h4`
  font-size: ${tokens.H4FontSize};
  min-height: 25px;
  padding-left: 25px;
  width: 100%;
  word-wrap: break-word;
  // width: 410px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;

  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    background:${props => props.backgroundColor} !important;
  }
`

export const VoteWrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
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