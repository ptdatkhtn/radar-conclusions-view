import React, {useContext, useState, useMemo } from "react";
import {DataContext} from '../../store/GlobalState'
import VoteResults from "../VoteResults/VoteResults";
import RatingResults from "../RatingResults/RatingResults";
import FourfoldTable from '../FourfoldTable'
import ConclusionSession from "../ConclusionSession/ConclusionSession";
import {innerDimensions} from '../../helpers/dimension'
import { requestTranslation } from '@sangre-fp/i18n';
import {
  VoteTabWrapper,
  HorizontalLine,
  ConclusionsHeader,
  ConclusionsTabFooter
} from "./styles";
const VotingResultsView = () => {
  const { state: {phenonmenaData, radar, hiddenPhenomenaRating, hiddenPhenomenaVoting, isFlip }} = useContext(DataContext)

  let phenomenaFlip = [];
  if ( !!phenonmenaData?.length && isFlip) {
    /* eslint-enable */
    phenonmenaData.map((p) => {
      const rating_x = p && p['rating_y']
      const rating_y = p && p['rating_x']
      const ratingCurrentX = p && p['ratingCurrentY']
      const ratingCurrentY = p && p['ratingCurrentX']
      const phenCLone = {...p}
      phenCLone['rating_x'] = rating_x
      phenCLone['rating_y'] = rating_y
      phenCLone['ratingCurrentX'] = ratingCurrentX
      phenCLone['ratingCurrentY'] = ratingCurrentY

      phenomenaFlip.push(phenCLone)
    })
  } else {
    phenomenaFlip = phenonmenaData
  }

  // phenomenaFlip = phenonmenaData

  const visiblePhenonmenaVoting = useMemo(() => {
    return phenomenaFlip ? phenomenaFlip.filter(phenomenon => !hiddenPhenomenaVoting?.includes(phenomenon?.id)) : []
  }, [phenonmenaData, hiddenPhenomenaVoting])
  
  const visiblePhenonmenaRating = useMemo(() => {
    return phenomenaFlip ? phenomenaFlip.filter(phenomenon => !hiddenPhenomenaRating?.includes(phenomenon?.id)) : []
  }, [phenonmenaData, hiddenPhenomenaRating])

  const getTabContentElement = document.getElementsByClassName('tab-content')[0]
  
  const sortedPhenomenaForChart = React.useMemo(() => {
    const sortedPhenomenaX = visiblePhenonmenaRating
      .filter((p) => p.hasOwnProperty("rating_x") && p["rating_x"])
      .sort((a, b) => Number(b["rating_x"].avg) - Number(a["rating_x"].avg))
      .slice(0, 5)
    const sortedPhenomenaY = visiblePhenonmenaRating.filter((p) => p.hasOwnProperty("rating_y") && p["rating_y"])
    .sort((a, b) => Number(b["rating_y"].avg) - Number(a["rating_y"].avg))
    .slice(0, 5)
    
    return sortedPhenomenaX ? sortedPhenomenaX.concat(sortedPhenomenaY) : []
  }, [visiblePhenonmenaRating])

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
      : 900
      )
  }

  React.useEffect(() => {
    calcSizeRateTabWrapper()
    return () => {
      window.removeEventListener('resize', calcSizeRateTabWrapper)
    }
  }, [])

  try {
    window.addEventListener('resize', function () {
      // clearTimeOut() resets the setTimeOut() timer
      // due to this the function in setTimeout() is 
      // fired after we are done resizing
      clearTimeout(eventTimeoutRef.current)
  
      // setTimeout returns the numeric ID which is used by
      // clearTimeOut to reset the timer
      eventTimeoutRef.current = setTimeout(calcSizeRateTabWrapper, 250);
    }, false)
  } catch (error) {
    console.error(error)
  }

  return (
    <VoteTabWrapper>
      <ConclusionSession />
      <HorizontalLine></HorizontalLine>
      <ConclusionsHeader>{(radar?.radarLanguage === "en" ? 'Top 5 voted content' : 'Top 5 -äänestetyt') || (requestTranslation('top5Voted_RadarConclusions'))}</ConclusionsHeader>
      {visiblePhenonmenaVoting.length > 0 && radar && (
        <VoteResults phenomena={visiblePhenonmenaVoting} radar={radar}/>
      )}
      
      <HorizontalLine></HorizontalLine>
      <ConclusionsHeader>{ (radar?.radarLanguage === "en" ? 'Top 5 rated content' : 'Top 5 -arvioidut') || (requestTranslation('top5Rated_RadarConclusions'))}</ConclusionsHeader>
      {
        width > 0 && radar && sortedPhenomenaForChart.length > 0 &&
        <FourfoldTable 
          phenomena={sortedPhenomenaForChart} 
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
      {visiblePhenonmenaRating.length > 0 && radar && (
        <RatingResults phenomena={visiblePhenonmenaRating} radar={radar}/>
      )}
      
      <ConclusionsTabFooter></ConclusionsTabFooter>
    </VoteTabWrapper>
  );
};

export default VotingResultsView;
