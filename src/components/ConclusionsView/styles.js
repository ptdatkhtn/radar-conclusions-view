import styled from "styled-components/macro";
import {InfoCircle} from '@styled-icons/boxicons-regular'

export const VoteTabWrapper = styled.div`
    background-color: #e8ebeb;
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 20px;
`

export const HorizontalLine = styled.hr`
    margin: 2em 0;
    border: 0;
    height: 1px;
    background: #c4c4c4;
`

export const ConclusionsHeader = styled.h3`
    width: 100%;
    margin-bottom: 16px;
`

export const ConclusionsTabFooter = styled.div`
  margin: 40px 0 30px 0;
  font-size: 13px;
  border-top: 1px solid #c4c4c4;
  padding-top: 20px;
`

export const ShareBtn = styled.a`
    width: 86px;
    height: 32px;
`
export const HeaderWrapper = styled.div`
  display: flex;
  margin-bottom: 26px;
  justify-content: space-between
`
export const InformationIcon = styled(InfoCircle)`
    color: #666;
    width: 18px;
    height: 18px;
    margin-top: 8px;
    margin-left: 18px;
    &:hover {
        cursor: pointer;
        color: #64cdef;
    }
`
export const HoverBox = styled.p`
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: auto; 
`