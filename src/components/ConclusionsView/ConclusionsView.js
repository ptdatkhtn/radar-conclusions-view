import React, {useContext, useState, useMemo } from "react";
import {DataContext} from '../../store/GlobalState'
import VoteResults from "../VoteResults/VoteResults";
import RatingResults from "../RatingResults/RatingResults";
import FourfoldTable from '../FourfoldTable'
import ConclusionSession from "../ConclusionSession/ConclusionSession";
import {innerDimensions} from '../../helpers/dimension'
import { requestTranslation } from '@sangre-fp/i18n';
import Popover from '@material-ui/core/Popover';
import InformationModal from '../InformationModal/InformationModal'
import {
  VoteTabWrapper,
  HorizontalLine,
  ConclusionsHeader,
  InformationIcon,
  ConclusionsTabFooter,
  HeaderWrapper,
  HoverBox,
  ShareBtn
} from "./styles";
import { makeStyles, 
  // createStyles, 
  // Theme 
} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
    width: '40%'
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: '#424242',
    color: '#fff',
    width: 'fit-content'
  },
  
}));

const VotingResultsView = () => {
  const { state: {phenonmenaData, radar, hiddenPhenomenaRating, hiddenPhenomenaVoting, isFlip }} = useContext(DataContext)
  const [openRatingInformationModal, setOpenRatingInformationModal] = useState(false)
  const [ratingDescriptionDisplayed, setRatingDescriptionDisplayed] = useState(false)
  const [ratingAnchorEl, setRatingAnchorEl] = useState(null);
  const classes = useStyles()

  let phenomenaFlip = [];
  const onHoverRatingIcon = (event) => {
    setRatingAnchorEl(event.currentTarget)
    setRatingDescriptionDisplayed(true)
  }
  const onLeaveRatingIcon = () => {
    setRatingAnchorEl(null)
    setRatingDescriptionDisplayed(false)
  }
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

  const openRatingInformationModalHandle = () => {
    setOpenRatingInformationModal(true)
  }
  const closeRatingInformationModalHandle = () => {
      setOpenRatingInformationModal(false)
  } 
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
       <HeaderWrapper>
        <div style={{display: 'flex'}}>
          <h2>{(radar?.radarLanguage === "en" ? 'Rating results' : 'Arvioinnin tulokset') || requestTranslation('RatingResultsTitle')}</h2>
          <InformationIcon 
              // background={false}
              onMouseEnter={onHoverRatingIcon} 
              onMouseLeave={onLeaveRatingIcon}
              onClick={openRatingInformationModalHandle}
          />
          <Popover 
            className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={ratingDescriptionDisplayed || false}
            anchorEl={ratingAnchorEl} 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            onClose={onLeaveRatingIcon}
            disableRestoreFocus
          >
            <HoverBox>{(radar?.radarLanguage === "en" ? 'More information on Rating results view' : 'Lisää tietoa arvioinnin tulosnäkymästä') || requestTranslation('InfoIconHoverRating')}</HoverBox>
          </Popover> 
          <InformationModal 
              radar={radar}
              InfoModalHeader={(radar?.radarLanguage === "en" ? 'Rating results' : 'Arvioinnin tulokset') || requestTranslation('RatingTool')}
              InfoModalNote={(radar?.radarLanguage === "en" ? `The Rating results view consists of two main sections: the fourfold table that shows the results in 2-by-2 matrix, and two lists for both axes. You can review the content cards by clicking the dots / titles.
              ` : 'Arvioinnin tulosnäkymä koostuu kahdesta osiosta: nelikentästä ja kumpaakin arviointiakselia vastaavasta listasta.') || requestTranslation('InfoModalRatingNote')}
              InfoModalNote2={(radar?.radarLanguage === "en" ? `The fourfold table:
              ` : 'Nelikenttä:') || requestTranslation('InfoModalRatingNote2')}
              InfoModalNote3={(radar?.radarLanguage === "en" ? `The lists:
              ` : 'Listat:') || requestTranslation('InfoModalRatingNote2')}
              InfoModalNote4={(radar?.radarLanguage === "en" ? `At the bottom of the view, for the facilitators, there is the list of hidden items and a possibility to clear all results.
              ` : 'Näkymän alaosassa on fasilitaattoreille näkyvissä lista piilotetuista ilmiöistä sekä mahdollisuus tyhjentää arvioinnin tulokset.') || requestTranslation('InfoModalRatingNote2')}
              InfoModalNote4b={(radar?.radarLanguage === "en" ? `Note:
              ` : ' Huom: ') || requestTranslation('InfoModalRatingNote2')}
              InfoModalNote4c={(radar?.radarLanguage === "en" ? `Clearing the results can’t be undone, so please make sure you have exported the results as PPT Summary before clearing the rating score.
              ` : 'Arvioiden tyhjentäminen poistaa kaikki tehdyt arvioinnit, minkä jälkeen niitä ei voi palauttaa. Varmistathan, että olet sitä ennen tallentanut työn tulokset esimerkiksi PPT-yhteenvedoksi.') || requestTranslation('InfoModalRatingNote2')}
              InfoModalOpen={openRatingInformationModal}
              InfoModalClose={closeRatingInformationModalHandle}
              LearnMoreBtn={requestTranslation('LearnMoreRatingBtn')}
              GuideBtn={requestTranslation('GuideRatingBtn')}
              LearnMoreLink='https://info.futuresplatform.com/hub/how-to-rate'
              GuideLink='https://info.futuresplatform.com/hub/most-commonly-used-axis-for-rating'
              InfoModalDescription={(radar?.radarLanguage === "en" ? 'Zooming is possible like in the radar screen (scroll with two fingers or with mouse)' 
                : 'Näkymää voi zoomata kuten karttaa (hiirellä tai kahdella sormella rullaamalla)') || requestTranslation('InfoModalRatingContent')}
              InfoModalDescription2={(radar?.radarLanguage === "en" ? 'Dots are placed based on the average/median values' 
                : 'Pallojen sijainti määräytyy keskiarvon/ mediaanin mukaisesti') || requestTranslation('InfoModalRatingContent2')}
              InfoModalDescription3={(radar?.radarLanguage === "en" ? 'Absolute / dispersed mode: if the dots are placed on top of each other, the dispersed mode moves them slightly apart from each other' 
                : 'Tarkka / hajautettu sijoittelu: jälkimmäisessä päällekkäin sijaitsevia sisältöjä siirretään hieman, jotta kaikki sisällöt tulevat näkyviin') || requestTranslation('InfoModalRatingContent3')}
              InfoModalDescription4={(radar?.radarLanguage === "en" ? 'Hide title shows the matrix without Content titles' 
                : 'Halutessasi voit piilottaa otsikot') || requestTranslation('InfoModalRatingContent4')}
              InfoModalDescription5={(radar?.radarLanguage === "en" ? 'Resize -/+ changes the size of the titles and dots' 
                : 'Tekstin koko -/+ vaikuttaa nimen lisäksi myös pallon kokoon') || requestTranslation('InfoModalRatingContent5')}
              InfoModalDescription6={(radar?.radarLanguage === "en" ? 'Fullscreen button opens the matrix in presentation mode; to return to the normal view press the X button or ESC key' 
                : 'Voit avata näkymän koko ruudulle painamalla koko näyttö -painiketta (full screen). Paluu tapahtuu joko näkymän oikeasta yläkulmasta X:ää tai näppäimistöltä ESC-painiketta.') || requestTranslation('InfoModalRatingContent5')}

              InfoModalDescriptionb={(radar?.radarLanguage === "en" ? 'Sorted by average/median value (large dots)' 
                : 'Yhteenlasketun keskiarvon/mediaanin mukainen järjestys (isot pallot)') || requestTranslation('InfoModalRatingContent6')}
              InfoModalDescriptionb2={(radar?.radarLanguage === "en" ? 'Small dots are showing individual assessments' 
                : 'Pienet pallot ovat yksittäisten käyttäjien arvioita') || requestTranslation('InfoModalRatingContent6')}
              InfoModalDescriptionb3={(radar?.radarLanguage === "en" ? 'Small blue dot represents your personal assessment' 
                : 'Pieni sininen pallo näyttää oman arviosi') || requestTranslation('InfoModalRatingContent6')}
              InfoModalDescriptionb4={(radar?.radarLanguage === "en" ? 'Single content items can be hidden from the list by clicking the eye icon' 
                : 'Sisältökortteja voidaan piilottaa listalta klikkaamalla silmä-ikonia') || requestTranslation('InfoModalRatingContent6')}
          />
        </div>
        <ShareBtn className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}><span className="af-custom-share" />{(radar?.radarLanguage === "en" ? 'SHARE' : 'JAA')}</ShareBtn>
      </HeaderWrapper>
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
        <RatingResults phenomena={visiblePhenonmenaRating} radar={radar} isFlip={isFlip}/>
      )}
      
      <ConclusionsTabFooter></ConclusionsTabFooter>
    </VoteTabWrapper>
  );
};

export default VotingResultsView;
