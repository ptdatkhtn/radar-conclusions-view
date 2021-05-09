import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import {
  RatingWidget,
  RatingItemHeader,
  RatingItem,
  RatingSlider,
  RatingHeader,
  RatingSliderScale,
  SliderScaleMin,
  SliderScaleMax
} from "./styles";

import {SingleRating} from './styles'

const Rating = ({ phenomenon, radar, isRatingX }) => { 
  const {
    state: { error }
  } = useContext(DataContext);

  let symbolPhenomenon = ''
  let symbolBorderPhenomenon = ''
  let symbolBoxShadowPhenomenon = ''
  if(phenomenon?.['content-type-title'] === 'Strengthening'){
    symbolPhenomenon= 'rgb(0, 202, 141)'
    symbolBorderPhenomenon= 'transparent'
    symbolBoxShadowPhenomenon='transparent'
  } 
  else if(phenomenon?.['content-type-title'] === 'Weak signal'){
    symbolPhenomenon= 'rgb(168, 168, 168)'
    symbolBorderPhenomenon= 'transparent'
    symbolBoxShadowPhenomenon='transparent'

  }
  else if (phenomenon?.['content-type-title'] === 'Summary'){
    symbolPhenomenon= 'rgb(0, 202, 141)'
    symbolBorderPhenomenon= 'rgb(0, 202, 141)'
    symbolBoxShadowPhenomenon='#fff'

  }
  else if (phenomenon?.['content-type-title'] === 'Weakening'){
    symbolPhenomenon= 'rgb(0, 152, 255)'
    symbolBorderPhenomenon= 'transparent'
    symbolBoxShadowPhenomenon='transparent'

  }
  else if (phenomenon?.['content-type-title'] === 'Wild card'){
    symbolPhenomenon= 'rgb(233, 87, 87)'
    symbolBorderPhenomenon= 'transparent'
    symbolBoxShadowPhenomenon='transparent'

  }
  else {
    symbolPhenomenon= 'transparent'
    symbolBorderPhenomenon='rgb(0, 202, 141)'
    symbolBoxShadowPhenomenon='transparent'

  }

  return (
    !error && (
      <RatingWidget>
        <RatingHeader>
          <RatingItemHeader symbol={symbolPhenomenon} symbolBorder={symbolBorderPhenomenon} symbolBoxShadow={symbolBoxShadowPhenomenon}>{phenomenon?.content?.title}</RatingItemHeader>
        </RatingHeader>
        <RatingItem>
          <RatingSliderScale>
              <SliderScaleMin>{isRatingX? radar?.axisXMin : radar?.axisYMin}</SliderScaleMin>
              <SliderScaleMax>{isRatingX? radar?.axisXMax : radar?.axisYMax}</SliderScaleMax>
            </RatingSliderScale>
          <RatingSlider
            className="inactive"
            type="range"
            min="1"
            max="100"
            value={isRatingX? phenomenon?.rating_x?.avg: phenomenon?.rating_y?.avg }
            disabled={true}
          ></RatingSlider>    
          <div style={{position:'relative', width:'100%'}}>
            {
              ((isRatingX ? 
                (phenomenon?.rating_x?.values && !!phenomenon?.rating_x?.values?.length && phenomenon?.rating_x?.values)
                : (phenomenon?.rating_y?.values && !!phenomenon?.rating_y?.values?.length && phenomenon?.rating_y?.values)) || [])?.map(
                     /* eslint-disable */
                  rating => {
                    return <SingleRating leftValue={rating}/>
                  }
                  
              )
            }
          </div>     
        </RatingItem>
      </RatingWidget>
    )
  );
};

export default Rating;
