import React from "react";

import RatingResult from "../RatingResult/RatingResult";
import { Container, AxisName } from "./styles";
const RatingResults = ({ phenomena, radar }) => {
  let SortedPhenomenaX = [];
  let SortedPhenomenaY = [];
  phenomena.filter((p) => {
    if (p.hasOwnProperty("rating_x")) {
      SortedPhenomenaX = SortedPhenomenaX.concat(p);
    }
  });

  phenomena.filter((p) => {
    if (p.hasOwnProperty("rating_y")) {
      SortedPhenomenaY = SortedPhenomenaY.concat(p);
    }
  });
  return (
    <Container>
      <div>
        <AxisName>Horizontal</AxisName>
        {SortedPhenomenaX.sort(
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
      <div>
        <AxisName>Vertical</AxisName>
        {SortedPhenomenaY.sort(
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
