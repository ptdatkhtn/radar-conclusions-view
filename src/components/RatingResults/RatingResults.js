import React from "react";

import RatingResult from "../RatingResult/RatingResult";
import { Container, AxisName } from "./styles";
import { ratingApi } from "../../helpers/fetcher";

const RatingResults = ({ phenomena, radar }) => {
  let SortedPhenomenaX = [];
  // let SortedPhenomenaY = [];

  phenomena.filter((p) => {
    if (p.hasOwnProperty("rating_x") && p.hasOwnProperty("rating_y")) {
      SortedPhenomenaX = SortedPhenomenaX.concat(p);
    }
  });

  const [phenonmenonListX, setphenonmenonListX] = React.useState([])


  React.useEffect(() => {
    const fetchRatingsCurrentUser = async () => {
      const ratingsCurrentUser = await ratingApi.getRatingsCurrentUserOnly1Api(radar?.group.id, radar?.id)

      /* eslint-disable */
      /* eslint-disable */
      Object.entries(ratingsCurrentUser?.data).filter( rating => {
        const currentPhenId = rating[0]?.split('/')[5]
        SortedPhenomenaX?.map((pheX) => {
          if (String(currentPhenId) === String(pheX?.id)) {
            // console.log('pheX', pheX)
            if (String(rating[0]?.split('/')[6]) === 'x') {
              pheX['ratingCurrentX'] = rating[1]?.percentage
            } else if (String(rating[0]?.split('/')[6]) === 'y') {
              pheX['ratingCurrentY'] = rating[1]?.percentage
            }
          }
        })
      })

      setphenonmenonListX(SortedPhenomenaX)
    }

    fetchRatingsCurrentUser()
   
  }, [phenomena])

  return (
    <Container>
      <div style={{width: 'calc(50% - 12px)'}}>
        <AxisName>{radar?.axisXTitle}</AxisName>
        {phenonmenonListX?.sort(
          (a, b) => Number(b["rating_x"].avg) - Number(a["rating_x"].avg)
        )
        .slice(0, 5)
        .map((phenomenon) => (
          <RatingResult
            phenomenon={phenomenon}
            key={phenomenon.id}
            isRatingX={true}
            radar={radar}
            currentUserRatings={phenomenon}
          />
        ))}
      </div>
      <div style={{width: 'calc(50% - 12px)'}}>
        <AxisName>{radar?.axisYTitle}</AxisName>
        { phenonmenonListX?.sort(
          (a, b) => Number(b["rating_y"].avg) - Number(a["rating_y"].avg)
        )
        .slice(0, 5)
        .map((phenomenon) => (
          <RatingResult
            phenomenon={phenomenon}
            key={phenomenon.id}
            isRatingX={false}
            radar={radar}
            currentUserRatings={phenomenon}
          />
        ))}
      </div>
    </Container>
  );
};

export default RatingResults;
