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
import { ACTIONS } from "../../store/Actions";
import {getPhenomenonUrl} from '../../helpers/contentCard'
import * as tokens from "@sangre-fp/css-framework/tokens/fp-design-tokens"
import { votingApi } from "../../helpers/fetcher";
const VoteResult = ({ phenomenon, radar }) => {

  const {
    state: { phenonmenaData, hiddenPhenomena, error },
    dispatch,
  } = useContext(DataContext);
  const [voteStatus, setVoteStatus] = React.useState(VOTING_STATUS.none);
  const [amountHandler, setAmountHandler] = React.useState(0);

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
  }, [phenomenon]);

  // get all radar phenomenon votes
  const fetchAllVotes = React.useCallback(async () => {
    const { data } = await votingApi.getVotes(
      radar.group.id,
      radar.id,
      phenomenon.id
    );

    const newPhenomena = [...phenonmenaData];
    /* eslint-disable */
    !!phenonmenaData?.length &&
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
  }, [dispatch, phenomenon, radar]);

  const onUpHandler = async () => {
    try {
      // await fetchVoteCurrentUser();
      if (String(voteStatus) === String(VOTING_STATUS.up)) {
        
        await votingApi.deleteVote(radar.group.id, radar.id, phenomenon.id);
        
      } else {
        
        await votingApi.addVote(radar.group.id, radar.id, phenomenon.id, {
          up: true,
        });
        
      }
      // update/get vote(s) after handle up-vote
      // await fetchAllVotes();
      setAmountHandler(amountHandler => amountHandler + 1)
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        payload:{error},
      })
    }
  };

  const onDownHandler = async () => {
    try {
      if (String(voteStatus) === String(VOTING_STATUS.down)) {
        // setVoteStatus(VOTING_STATUS.none)
        await votingApi.deleteVote(radar.group.id, radar.id, phenomenon.id);
        
      } else {
        // setVoteStatus(VOTING_STATUS.down)
        
        await votingApi.addVote(radar.group.id, radar.id, phenomenon.id, {
          up: false,
        });
        
      }
      // update/get vote(s) after handle down-vote
      
      setAmountHandler(amountHandler => amountHandler + 1)
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: {error},
      })
    }
  };

  useEffect(() => {
    if (amountHandler < 1) {
      const setStatus = async() => {
        const {
          data: { plus_votes, minus_votes },
        } = await votingApi.getVote(radar.group.id, radar.id, phenomenon.id);
        
        const sum = Number(plus_votes - minus_votes);
    
        if (sum === 0) {
          setVoteStatus(VOTING_STATUS.none);
        } else {
          setVoteStatus(Number(sum) === 1 ? VOTING_STATUS.up : VOTING_STATUS.down);
        }
      }
      setStatus()
    }
     else {
      const setStatus = async() => {
        const [getVoteData, getAllVotesData] = await Promise.all([
          votingApi.getVote(radar.group.id, radar.id, phenomenon.id),
          fetchAllVotes()
        ])
        const { data: { plus_votes, minus_votes }} = getVoteData
        console.log('aaa', getVoteData)
        // const {
        //   data: { plus_votes, minus_votes },
        // } = await votingApi.getVote(radar.group.id, radar.id, phenomenon.id);
        // await fetchAllVotes();
        const sum = Number(plus_votes - minus_votes);
    
        if (sum === 0) {
          setVoteStatus(VOTING_STATUS.none);
        } else {
          setVoteStatus(Number(sum) === 1 ? VOTING_STATUS.up : VOTING_STATUS.down);
        }
      }
      setStatus()
     }
  }, [amountHandler, setAmountHandler]);

  let iconClassName = ''
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

  const onVisibilityHandler = async () => {
    const hiddenPhenomenaUpdated = hiddenPhenomena?.concat(phenomenon?.id);
    await dispatch({
      type: ACTIONS.HIDDENPHENOMENA,
      payload: hiddenPhenomenaUpdated,
    });
    const payload = {
      [`voting/${radar.group.id}/radar/${radar.id}`]: {
        hidden: hiddenPhenomenaUpdated,
      },
    };
    await votingApi.addHiddenPhenomenaVotes(radar.group.id, radar.id, payload);
  };
  return (
    <Container>
      <WildCardWrapper className='left' data-href={getPhenomenonUrl(radar?.id, phenomenon)}>
        <WildCard
          className= {`icon-issue ${iconClassName}`}
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
      <a onClick={onVisibilityHandler}>
        <span className=" af-custom-eye-blocked" style={{fontSize: '1.3em', color: tokens.ColorBlue, cursor: 'pointer'}}/>
      </a>
    </Container>
  );
};

export default VoteResult;
