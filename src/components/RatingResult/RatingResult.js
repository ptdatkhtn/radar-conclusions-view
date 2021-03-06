import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import {
  RatingWidget,
  RatingItemHeader,
  RatingItem,
  RatingHeader,
  RatingSliderScale,
  SliderScaleMin,
  SliderScaleMax,
  SingleRatingCurrentUser
} from "./styles";
import {getPhenomenonUrl} from '../../helpers/contentCard'
import {SingleRating} from './styles'
import Slider from '../Slider'

const Rating = ({ phenomenon, radar, isRatingX }) => { 
  const {
    state: { error, keyAvgMedian }
  } = useContext(DataContext);

  let iconClassName = ''
  let backgroundColor = ''
  if(String(phenomenon?.['color']) === 'none'){
    if(phenomenon?.['content-type-alias'] === 'rising'){
      iconClassName = 'rising'
    } 
    else if(phenomenon?.['content-type-alias'] === 'weaksignal'){
      iconClassName = 'weaksignal'
    }
    else if (phenomenon?.['content-type-alias'] === 'summary'){
      iconClassName = 'summary'
    }
    else if (phenomenon?.['content-type-alias'] === 'cooling'){
      iconClassName = 'cooling'
    }
    else if (phenomenon?.['content-type-alias'] === 'wildcard'){
      iconClassName = 'wildcard'
    }
    else {
      iconClassName = 'undefined'
    }
  } else {
    iconClassName = 'undefined'
    backgroundColor = phenomenon?.['color']
  }

  return (
    <RatingWidget>
        <RatingHeader className='left' data-href={getPhenomenonUrl(radar?.id, phenomenon)}>
          <RatingItemHeader 
            className= {`icon-issue ${iconClassName}`}
            backgroundColor={backgroundColor}
          >
            {phenomenon?.content?.short_title || phenomenon?.content?.title}
          </RatingItemHeader>
        </RatingHeader>
        <RatingItem>
          <RatingSliderScale>
              <SliderScaleMin>{isRatingX? radar?.axisXMin : radar?.axisYMin}</SliderScaleMin>
              <SliderScaleMax>{isRatingX? radar?.axisXMax : radar?.axisYMax}</SliderScaleMax>
            </RatingSliderScale>
            <Slider 
              value={isRatingX? (keyAvgMedian === 1 ? phenomenon?.rating_x?.avg : phenomenon?.rating_x?.median): (keyAvgMedian === 1 ? phenomenon?.rating_y?.avg : phenomenon?.rating_y?.median) }
            />   
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

          <SingleRatingCurrentUser 
            leftValue
              ={isRatingX 
                  ? phenomenon?.ratingCurrentX
                    : phenomenon?.ratingCurrentY} 
                isRated={!!phenomenon?.ratingCurrentX}
          />
          </div>     
        </RatingItem>
      </RatingWidget>
  );
};

export default Rating;
