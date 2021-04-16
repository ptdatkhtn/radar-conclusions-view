import React from "react";
import VoteResult from "../VoteResult/VoteResult";
import { VoteResultsWrapper } from "./styles";

const VoteResults = ({ phenomena, radar }) => {
  let SortedPhenomena = [];
  // const SortedPhenomena = !!phenomena?.length ? [].concat(phenomena) : [];
  phenomena.filter((p) => {
    if (p.hasOwnProperty("vote_result")) {
      SortedPhenomena = SortedPhenomena.concat(p);
    }
  });

  return (
    <VoteResultsWrapper>
      {SortedPhenomena.sort(
        (a, b) =>
          Number(b.vote_result.plus_votes - b.vote_result.minus_votes) - Number(a.vote_result.plus_votes - a.vote_result.minus_votes)
      )
        .slice(0, 5)
        .map((phenomenon) => (
          <VoteResult
            phenomenon={phenomenon}
            radar={radar}
            key={phenomenon.id}
          />
        ))}
    </VoteResultsWrapper>
  );
};

export default VoteResults;
