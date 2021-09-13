import React from "react";
import VoteResult from "../VoteResult/VoteResult";
import { VoteResultsWrapper } from "./styles";
import { votingApi } from "../../helpers/fetcher";

const VoteResults = ({ phenomena, radar }) => {
  const [phenonList, setphenonList] = React.useState([]);

  let SortedPhenomena = [];
  // const SortedPhenomena = !!phenomena?.length ? [].concat(phenomena) : [];
  phenomena?.filter((p) => {
    if (p.hasOwnProperty("vote_result")) {
      SortedPhenomena = SortedPhenomena?.concat(p);
    }
  });

  React.useEffect(() => {
    const getVotingCurrentUser = async () => {
      const {data } = await votingApi.getVotingsCurrentUserOnly1Api(
        radar?.group?.id,
        radar.id
      )

      !!SortedPhenomena?.length && SortedPhenomena.map((phenSorted) => {
        !!data?.length && data?.some(d => {
          // console.log(11111, d, phenSorted)
          if (String(d['entityUri']?.split('/')[5]) ===  phenSorted?.id) {
            phenSorted['currentUp'] = d.up
            return true
          }
        })


      })

      setphenonList(SortedPhenomena)
      // !!phenomena?.length && phenomena 
    }

    !!phenomena?.length && getVotingCurrentUser()
  }, [phenomena])

  return (
    <VoteResultsWrapper>
      {phenonList.sort(
        (a, b) =>
          Number(b?.vote_result?.plus_votes - b?.vote_result?.minus_votes) - Number(a?.vote_result?.plus_votes - a?.vote_result?.minus_votes) || null
      )
      .sort((a, b) => {
        if (Number(b.vote_result?.plus_votes - b.vote_result?.minus_votes) - Number(a.vote_result?.plus_votes - a.vote_result?.minus_votes) == 0) 
            return a.content?.title.localeCompare(b.content?.title)
      })
        .slice(0, 5)
        .map((phenomenon) => {
          return (
           <>
           {
             phenomenon?.vote_result &&  (<VoteResult
             phenomenon={phenomenon}
             radar={radar}
             key={phenomenon?.id}
           />)
           }
           </>
          )
        })}
    </VoteResultsWrapper>
  );
};

export default VoteResults;
