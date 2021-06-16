import React, {useContext, useState} from "react";
import {DataContext} from '../../store/GlobalState'
import VoteResults from "../VoteResults/VoteResults";
import RatingResults from "../RatingResults/RatingResults";
import FourfoldTable from '../FourfoldTable'
import ConclusionSession from "../ConclusionSession/ConclusionSession";
import {innerDimensions} from '../../helpers/dimension'
import {
  VoteTabWrapper,
  HorizontalLine,
  ConclusionsHeader,
  ConclusionsTabFooter
} from "./styles";
const VotingResultsView = () => {
  const { state: {phenonmenaData, radar, hiddenPhenomenaRating, hiddenPhenomenaVoting }} = useContext(DataContext)
  let visiblePhenonmenaRating = []
  let visiblePhenonmenaVoting = []

  visiblePhenonmenaRating = phenonmenaData?.filter(phenomenon => !hiddenPhenomenaRating?.includes(phenomenon?.id))
  visiblePhenonmenaVoting = phenonmenaData?.filter(phenomenon => !hiddenPhenomenaVoting?.includes(phenomenon?.id))

  const getTabContentElement = document.getElementsByClassName('tab-content')[0]
 
  let sortedPhenomenaX = [];
  let sortedPhenomenaY = [];
  let sortedPhenomenaForChart = [];
  sortedPhenomenaX = visiblePhenonmenaRating.filter((p) => p.hasOwnProperty("rating_x"))
    .sort((a, b) => Number(b["rating_x"].avg) - Number(a["rating_x"].avg))
    .slice(0, 5)
  sortedPhenomenaY = visiblePhenonmenaRating.filter((p) => p.hasOwnProperty("rating_y"))
  .sort((a, b) => Number(b["rating_y"].avg) - Number(a["rating_y"].avg))
  .slice(0, 5)
  
  sortedPhenomenaForChart = React.useMemo( () => sortedPhenomenaX.concat(sortedPhenomenaY), [phenonmenaData])


  const eventTimeoutRef = React.useRef(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const calcSizeRateTabWrapper = () => {
    setHeight(
      getTabContentElement? 
      (+(innerDimensions(getTabContentElement).width -60) * 0.56)
      : 800 * 0.56
      )

    setWidth(
      getTabContentElement?
      (innerDimensions(getTabContentElement).width -60)
      : 800
      )
  }

  React.useEffect(() => {
    calcSizeRateTabWrapper()
    return () => {
      window.removeEventListener('resize', calcSizeRateTabWrapper)
    }
  }, [])

  window.addEventListener('resize', function () {
    // clearTimeOut() resets the setTimeOut() timer
    // due to this the function in setTimeout() is 
    // fired after we are done resizing
    clearTimeout(eventTimeoutRef.current)

    // setTimeout returns the numeric ID which is used by
    // clearTimeOut to reset the timer
    eventTimeoutRef.current = setTimeout(calcSizeRateTabWrapper, 250);
  }, false)

  return (
    <VoteTabWrapper>
      <ConclusionSession />
      <HorizontalLine></HorizontalLine>
      <ConclusionsHeader>Top 5 voted phenomena</ConclusionsHeader>
        <VoteResults phenomena={visiblePhenonmenaVoting || []} radar={radar}/>
      <HorizontalLine></HorizontalLine>
      <ConclusionsHeader>Top 5 rated phenomena</ConclusionsHeader>
      {
        width > 0 && 
        <FourfoldTable 
          phenomena={sortedPhenomenaForChart || []} 
          containerWidth={width - 60} 
          containerHeight={height + 60}
          axisLabel3={radar?.fourFieldsBottomLeft} 
          axisLabel4={radar?.fourFieldsBottomRight} 
          axisLabel5={radar?.fourFieldsTopLeft} 
          axisLabel6={radar?.fourFieldsTopRight} 
          axisLabel1={radar?.axisXTitle}
          axisLabel1a={radar?.axisXMin}
          axisLabel1b={radar?.axisXMax}
          axisLabel2={radar?.axisYTitle}
          axisLabel2a={radar?.axisYMin}
          axisLabel2b={radar?.axisYMax}
          radar={radar}
        />
      }
        <RatingResults phenomena={visiblePhenonmenaRating || []} radar={radar}/>
        <ConclusionsTabFooter></ConclusionsTabFooter>
    </VoteTabWrapper>
  );
};

export default VotingResultsView;
