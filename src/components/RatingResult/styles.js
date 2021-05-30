import styled from "styled-components/macro";

export const RatingWidget = styled.div`
  width: 100%;
`

export const RatingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  :hover {
    cursor:pointer;
  }
`

export const RatingSliderScale = styled.div`
    &:after {
        display: block;
        clear: both;
        content: "";
    }
`

export const SliderScaleMin = styled.div`
    float: left;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
`

export const SliderScaleMax = styled.div`
    float: right;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    font-size: 13px;
`

export const RatingItemHeader = styled.h4`
    display: block;
    position: relative;
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.5;
    min-height: 25px;
    padding-left: 25px;
    padding-top: 0;
    padding-right: 60px;
    width: 99%;
    word-wrap: break-word;
    &:before {
        background:${props => props.symbol};
        border: 1px solid ${props => props.symbolBorder};
        box-shadow: inset 0px 0px 1px 1px ${props => props.symbolBoxShadow};
        display: block;
        position: absolute;
        left: 0;
        top: 3px;
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 100%;
    }
`

export const RatingItem = styled.div`
    padding-bottom: 24px;
`

export const RatingSlider = styled.input`
    position: relative;
    -webkit-appearance: none;
    width: 100%;
    background: #00c3ff;
    height: 6px;
    border-radius: 6px;

    &:after {
        display: block;
        content: "";
        position: absolute;
        top: -6px;
        left: 50%;
        width: 3px;
        height: 18px;
        background-color: #00c3ff;
        z-index: 1;
        margin-left: -6px;
    }

    &:focus {
        outline: none;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background: #00c3ff;
        border-radius: 100%;
        width: 20px;
        height: 20px;
        outline: none;
        cursor: pointer;
        z-index: 333;    
    }

    &.inactive {
        background-color: #c4c4c4;;
    }

    &.inactive:after {
        background-color: #c4c4c4;;
    }

    &.inactive::-webkit-slider-thumb {
        background-color: #848484;
    }
`

export const SingleRating= styled.span `
    height: 12px;
    width: 12px;
    background-color: #848484;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: -13px;
    left: calc(${props => props.leftValue}%  - 2.5px);
`