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
import {getPhenomenonUrl} from '../../helpers/contentCard'
import {SingleRating} from './styles'

const Rating = ({ phenomenon, radar, isRatingX }) => { 
  const {
    state: { error }
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
            {phenomenon?.content?.title}
          </RatingItemHeader>
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
  );
};

export default Rating;
