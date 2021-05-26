import React, { useEffect, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { VOTING_STATUS } from "../../constants";
import {
  Container,
  WildCardWrapper,
  WildCard,
  VoteWrapper,
  ButtonGroup,
  ButtonVote,
  VoteIcon,
  VoteAmountResult,
  LineUp,
  LineDown,
  TriangleUp,
  TriangleDown,
  VoteAmountItem,
} from "./styles";
import { votingApi } from "../../helpers/fetcher";
import { ACTIONS } from "../../store/Actions";
import {getPhenomenonUrl} from '../../helpers/contentCard'

const VoteResult = ({ phenomenon, radar }) => {
  const {
    state: { phenonmenaData, error },
    dispatch,
  } = useContext(DataContext);
  const [voteStatus, setVoteStatus] = React.useState(VOTING_STATUS.none);

  //get radar phenomenon vote for current user
  const fetchVoteCurrentUser = React.useCallback(async () => {
    const {
      data: { plus_votes, minus_votes },
    } = await votingApi.getVote(radar.group.id, radar.id, phenomenon.id);
    const sum = Number(plus_votes - minus_votes);

    if (sum === 0) {
      setVoteStatus(VOTING_STATUS.none);
    } else {
      setVoteStatus(Number(sum) === 1 ? VOTING_STATUS.up : VOTING_STATUS.down);
    }
  }, [phenomenon.id, radar.group.id, radar.id]);

  // get all radar phenomenon votes
  const fetchAllVotes = React.useCallback(async () => {
    const { data } = await votingApi.getVotes(
      radar.group.id,
      radar.id,
      phenomenon.id
    );

    const newPhenomena = [...phenonmenaData]
    !!newPhenomena?.length &&
      newPhenomena?.map((phen) => {
        if (phen?.id === phenomenon.id) {
          phen["vote_result"] = {
            ...data,
          };
        }
      });
    dispatch({
      type: ACTIONS.PHENOMENONDATA,
      payload: newPhenomena,
    });
  }, [dispatch, phenomenon.id, phenonmenaData, radar.group.id, radar.id]);

  const onUpHandler = async () => {
    try {
      // await fetchVoteCurrentUser();
      if (String(voteStatus) === String(VOTING_STATUS.up)) {
        setVoteStatus(VOTING_STATUS.none)
        await votingApi.deleteVote(radar.group.id, radar.id, phenomenon.id);
      } else {
        setVoteStatus(VOTING_STATUS.up)
        await votingApi.addVote(radar.group.id, radar.id, phenomenon.id, {
          up: true,
        });
      }
      // update/get vote(s) after handle up-vote
      await fetchAllVotes();
      // await fetchVoteCurrentUser();
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        payload:{error},
      })
    }
  };

  const onDownHandler = async () => {
    try {
      // await fetchVoteCurrentUser();
      if (String(voteStatus) === String(VOTING_STATUS.down)) {
        setVoteStatus(VOTING_STATUS.none)
        await votingApi.deleteVote(radar.group.id, radar.id, phenomenon.id);
      } else {
        setVoteStatus(VOTING_STATUS.down)
        await votingApi.addVote(radar.group.id, radar.id, phenomenon.id, {
          up: false,
        });
      }
      // update/get vote(s) after handle down-vote
      await fetchAllVotes();
      // await fetchVoteCurrentUser();
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: {error},
      })
    }
  };

  useEffect(() => {
    fetchVoteCurrentUser();
  }, [fetchVoteCurrentUser]);

  let symbolPhenomenon = "";
  let symbolBorderPhenomenon = "";
  let symbolBoxShadowPhenomenon = "";
  if (phenomenon?.["content-type-title"] === "Strengthening") {
    symbolPhenomenon = "rgb(0, 202, 141)";
    symbolBorderPhenomenon = "transparent";
    symbolBoxShadowPhenomenon = "transparent";
  } else if (phenomenon?.["content-type-title"] === "Weak signal") {
    symbolPhenomenon = "rgb(168, 168, 168)";
    symbolBorderPhenomenon = "transparent";
    symbolBoxShadowPhenomenon = "transparent";
  } else if (phenomenon?.["content-type-title"] === "Summary") {
    symbolPhenomenon = "rgb(0, 202, 141)";
    symbolBorderPhenomenon = "rgb(0, 202, 141)";
    symbolBoxShadowPhenomenon = "#fff";
  } else if (phenomenon?.["content-type-title"] === "Weakening") {
    symbolPhenomenon = "rgb(0, 152, 255)";
    symbolBorderPhenomenon = "transparent";
    symbolBoxShadowPhenomenon = "transparent";
  } else if (phenomenon?.["content-type-title"] === "Wild card") {
    symbolPhenomenon = "rgb(233, 87, 87)";
    symbolBorderPhenomenon = "transparent";
    symbolBoxShadowPhenomenon = "transparent";
  } else {
    symbolPhenomenon = "transparent";
    symbolBorderPhenomenon = "rgb(0, 202, 141)";
    symbolBoxShadowPhenomenon = "transparent";
  }
  
  return (
    !error && (
    <Container>
      <WildCardWrapper className='left' data-href={getPhenomenonUrl(radar?.id, phenomenon)}>
        <WildCard
          symbol={symbolPhenomenon}
          symbolBorder={symbolBorderPhenomenon}
          symbolBoxShadow={symbolBoxShadowPhenomenon}
        >
          {phenomenon?.content?.title}
        </WildCard>
      </WildCardWrapper>
      <VoteWrapper>
        <VoteAmountResult>{phenomenon?.vote_result?.plus_votes - phenomenon?.vote_result?.minus_votes}</VoteAmountResult>
        <ButtonGroup>
          <span>(</span>
          <ButtonVote role="button" onClick={onUpHandler}>
            <VoteIcon>
              <TriangleUp
                className={voteStatus === VOTING_STATUS.up ? "active" : ""}
              ></TriangleUp>
              <LineUp
                className={voteStatus === VOTING_STATUS.up ? "active" : ""}
              ></LineUp>
            </VoteIcon>
            <VoteAmountItem>
              {phenomenon?.vote_result?.plus_votes}
            </VoteAmountItem>
          </ButtonVote>
          <ButtonVote role="button" onClick={onDownHandler}>
            <VoteIcon>
              <LineDown
                className={voteStatus === VOTING_STATUS.down ? "active" : ""}
              ></LineDown>
              <TriangleDown
                className={voteStatus === VOTING_STATUS.down ? "active" : ""}
              ></TriangleDown>
            </VoteIcon>
            <VoteAmountItem>
              {phenomenon?.vote_result?.minus_votes}
            </VoteAmountItem>
          </ButtonVote>
          <span>)</span>
        </ButtonGroup>
      </VoteWrapper>
    </Container>
    )
  );
};

export default VoteResult;
