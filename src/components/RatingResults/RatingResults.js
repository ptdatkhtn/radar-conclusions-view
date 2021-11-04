import React, {useState} from "react";

import RatingResult from "../RatingResult/RatingResult";
import { Container, AxisName } from "./styles";
import { ratingApi } from "../../helpers/fetcher";

const RatingResults = ({ phenomena, radar, isFlip }) => {
  const [ratingsCurrentUser, setRatingsCurrentUser] = useState([])
  const SortedPhenomenaX = React.useMemo( () => {
    let sortedPhena = phenomena
    /* eslint-disable */
    ratingsCurrentUser.data && Object.entries(ratingsCurrentUser?.data).map( rating => {
      const currentPhenId = rating[0]?.split('/')[5]
      /* eslint-disable */
      sortedPhena.length > 0 && sortedPhena.map((pheX) => {
        if (String(currentPhenId) === String(pheX?.id)) {
          if (!isFlip) {
            if (String(rating[0]?.split('/')[6]) === 'x') {
              pheX['ratingCurrentX'] = rating[1]?.percentage
            } else if (String(rating[0]?.split('/')[6]) === 'y') {
              pheX['ratingCurrentY'] = rating[1]?.percentage
            }
          } else {
            if (String(rating[0]?.split('/')[6]) === 'x') {
              pheX['ratingCurrentY'] = rating[1]?.percentage
            } else if (String(rating[0]?.split('/')[6]) === 'y') {
              pheX['ratingCurrentX'] = rating[1]?.percentage
            }
          }
        }
      })
    })
    return sortedPhena
  }, [ratingsCurrentUser]);

  const xSortedPhenomena = React.useMemo( () => SortedPhenomenaX.length > 0 && SortedPhenomenaX
    ?.sort((a, b) => Number(b.rating_x?.avg) - Number(a.rating_x?.avg) ), [SortedPhenomenaX])
  const ySortedPhenomena = React.useMemo( () => SortedPhenomenaX.length > 0 && SortedPhenomenaX
    ?.sort((a, b) => Number(b.rating_y?.avg) - Number(a.rating_y?.avg) )
    , [SortedPhenomenaX])

  React.useEffect(() => {
    const fetchRatingsCurrentUser = async () => {
      const ratingsCurrentUser = await ratingApi.getRatingsCurrentUserOnly1Api(radar?.group.id, radar?.id)

      // /* eslint-disable */
      // /* eslint-disable */
      // Object.entries(ratingsCurrentUser?.data).filter( rating => {
      //   const currentPhenId = rating[0]?.split('/')[5]
      //   SortedPhenomenaX?.map((pheX) => {
      //     if (String(currentPhenId) === String(pheX?.id)) {
      //       // console.log('pheX', pheX)
      //       if (String(rating[0]?.split('/')[6]) === 'x') {
      //         pheX['ratingCurrentX'] = rating[1]?.percentage
      //       } else if (String(rating[0]?.split('/')[6]) === 'y') {
      //         pheX['ratingCurrentY'] = rating[1]?.percentage
      //       }
      //     }
      //   })
      // })

      setRatingsCurrentUser(ratingsCurrentUser)
    }

    !!phenomena.length && fetchRatingsCurrentUser()
   
  }, [phenomena])

  return (
    <Container>
      <div style={{width: 'calc(50% - 12px)'}}>
        <AxisName>{radar?.axisXTitle}</AxisName>
        {!!xSortedPhenomena.length && xSortedPhenomena
          .filter((p) => p.hasOwnProperty("rating_x") && p["rating_x"])
          .sort(
            (a, b) => Number(b["rating_x"].avg) - Number(a["rating_x"].avg)
        )
        .slice(0, 5)
        .map((phenomenon) => (
          <RatingResult
            phenomenon={phenomenon}
            key={phenomenon.id}
            isRatingX={true}
            radar={radar}
          />
        ))}
      </div>
      <div style={{width: 'calc(50% - 12px)'}}>
        <AxisName>{radar?.axisYTitle}</AxisName>
        { !!ySortedPhenomena.length && ySortedPhenomena
          .filter((p) => p.hasOwnProperty("rating_y") && p["rating_y"])
          .sort(
          (a, b) => Number(b["rating_y"].avg) - Number(a["rating_y"].avg)
        )
        .slice(0, 5)
        .map((phenomenon) => (
          <RatingResult
            phenomenon={phenomenon}
            key={phenomenon.id}
            isRatingX={false}
            radar={radar}
          />
        ))}
      </div>
    </Container>
  );
};

export default RatingResults;
