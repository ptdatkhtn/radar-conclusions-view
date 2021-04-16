import React, {useContext, useState} from "react";
import {DataContext} from '../../store/GlobalState'
import VoteResults from "../VoteResults/VoteResults";
import RatingResults from "../RatingResults/RatingResults";
import FourfoldTable from '../FourfoldTable'

import {
  VoteTabWrapper,
  HorizontalLine,
  ConclusionsHeader,
  ConclusionsTabFooter
} from "./styles";
const VotingResultsView = ({axisLabel3, axisLabel4, axisLabel5, axisLabel6, axisLabel1, axisLabel1a, axisLabel1b, axisLabel2, axisLabel2a, axisLabel2b}) => {
  const { state: {phenonmenaData, radar }} = useContext(DataContext)
  
  const stageCanvasRef = React.useRef(null);
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const calcSizeRateTabWrapper = React.useCallback(() => {
    setHeight(Number(2* stageCanvasRef?.current?.offsetWidth/3))
    setWidth(Number(stageCanvasRef?.current?.offsetWidth))
  }, [setHeight, setWidth])

  React.useEffect(() => {
    setHeight(Number(2* stageCanvasRef?.current?.offsetWidth/3))
    setWidth(Number(stageCanvasRef?.current?.offsetWidth))
    return () => {
      window.removeEventListener('resize', calcSizeRateTabWrapper)
    }
  }, [calcSizeRateTabWrapper, height, width])

  window.addEventListener('resize', calcSizeRateTabWrapper, false)

  return (
    <VoteTabWrapper ref={stageCanvasRef}>
      <HorizontalLine></HorizontalLine>
      <ConclusionsHeader>Top 5 voted phenomena</ConclusionsHeader>
        <VoteResults phenomena={phenonmenaData || []} radar={radar}/>
      <HorizontalLine></HorizontalLine>
      <ConclusionsHeader>Top 5 rated phenomena</ConclusionsHeader>
      {
        width > 0 && height > 0 && 
        <FourfoldTable 
          phenomena={phenonmenaData || []} 
          containerWidth={width -100} 
          containerHeight={height - 100}
          axisLabel3={axisLabel3} 
          axisLabel4={axisLabel4} 
          axisLabel5={axisLabel5} 
          axisLabel6={axisLabel6} 
          axisLabel1={axisLabel1}
          axisLabel1a={axisLabel1a}
          axisLabel1b={axisLabel1b}
          axisLabel2={axisLabel2}
          axisLabel2a={axisLabel2a}
          axisLabel2b={axisLabel2b}
        />
      }
        <RatingResults phenomena={phenonmenaData || []} radar={radar}/>
        <ConclusionsTabFooter></ConclusionsTabFooter>
    </VoteTabWrapper>
  );
};

export default VotingResultsView;
