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
const VotingResultsView = () => {
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
          axisLabel3={radar.fourFieldsBottomLeft} 
          axisLabel4={radar.fourFieldsBottomRight} 
          axisLabel5={radar.fourFieldsTopLeft} 
          axisLabel6={radar.fourFieldsTopRight} 
          axisLabel1={radar.axisXTitle}
          axisLabel1a={radar.axisXMin}
          axisLabel1b={radar.axisXMax}
          axisLabel2={radar.axisYTitle}
          axisLabel2a={radar.axisYMin}
          axisLabel2b={radar.axisYMax}
        />
      }
        <RatingResults phenomena={phenonmenaData || []} radar={radar}/>
        <ConclusionsTabFooter></ConclusionsTabFooter>
    </VoteTabWrapper>
  );
};

export default VotingResultsView;
