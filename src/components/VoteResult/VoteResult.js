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
  const [amountUpVotes, setAmountUpVotes] = React.useState(phenomenon?.vote_result?.plus_votes);
  const [amountDownVotes, setAmountDownVotes] = React.useState(phenomenon?.vote_result?.minus_votes);
  
  useEffect(() => {
    const updateAmountVotes = async() => {
      const { data } = await votingApi.getVotes(
        radar?.group?.id ? radar?.group?.id : 0,
        radar.id,
        phenomenon.id
      )
  
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
    
      // dispatch({
      //   type: ACTIONS.PHENOMENONDATA,
      //   payload: newPhenomena,
      // });
    }

    updateAmountVotes()

  }, [amountUpVotes, setAmountUpVotes, amountDownVotes, setAmountDownVotes])
  //get radar phenomenon vote for current user
  // const fetchVoteCurrentUser = React.useCallback(async () => {
  //   const {
  //     data: { plus_votes, minus_votes },
  //   } = await votingApi.getVote(radar.group.id, radar.id, phenomenon.id);
  //   const sum = Number(plus_votes - minus_votes);

  //   if (sum === 0) {
  //     setVoteStatus(VOTING_STATUS.none);
  //   } else {
  //     setVoteStatus(Number(sum) === 1 ? VOTING_STATUS.up : VOTING_STATUS.down);
  //   }
  // }, [phenomenon]);

  // get all radar phenomenon votes
  // const fetchAllVotes =async () => {
  //   const { data } = await votingApi.getVotes(
  //     radar.group.id,
  //     radar.id,
  //     phenomenon.id
  //   );

  //   const newPhenomena = [...phenonmenaData];
  //   /* eslint-disable */
  //   !!phenonmenaData?.length &&
  //     newPhenomena?.map((phen) => {
  //       if (phen?.id === phenomenon.id) {
  //         phen["vote_result"] = {
  //           ...data,
  //         };
  //       }
  //     });
  //   dispatch({
  //     type: ACTIONS.PHENOMENONDATA,
  //     payload: newPhenomena,
  //   });
  // }
  
  const onUpHandler = async () => {
    try {
      // await fetchVoteCurrentUser();
      if (String(voteStatus) === String(VOTING_STATUS.up)) {
        setVoteStatus(VOTING_STATUS.none)
        setAmountUpVotes(amountUpVotes - 1)

        await votingApi.deleteVote(radar?.group?.id || 0, radar?.id, phenomenon?.id);
      } else if (String(voteStatus) === String(VOTING_STATUS.none)) {
        setVoteStatus(VOTING_STATUS.up)
        setAmountUpVotes(amountUpVotes + 1)
        // setAmountDownVotes(amountDownVotes - 1)

        await votingApi.addVote(radar?.group?.id || 0, radar?.id, phenomenon?.id, {
          up: true,
        });
      } else {
        setVoteStatus(VOTING_STATUS.up)
        setAmountUpVotes(amountUpVotes + 1)
        setAmountDownVotes(amountDownVotes - 1)

        await votingApi.addVote(radar?.group?.id || 0, radar?.id, phenomenon?.id, {
          up: true,
        });
      }

      

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
        setVoteStatus(VOTING_STATUS.none)
        setAmountDownVotes(amountDownVotes - 1)

        await votingApi.deleteVote(radar?.group?.id || 0, radar?.id, phenomenon?.id);
        
      } else if (String(voteStatus) === String(VOTING_STATUS.none)) {
        // setVoteStatus(VOTING_STATUS.down)
        setVoteStatus(VOTING_STATUS.down)
        // setAmountUpVotes(amountUpVotes - 1)
        setAmountDownVotes(amountDownVotes + 1)

        await votingApi.addVote(radar?.group?.id || 0, radar?.id, phenomenon?.id, {
          up: false,
        });
      } else {
        setVoteStatus(VOTING_STATUS.down)
        setAmountUpVotes(amountUpVotes - 1)
        setAmountDownVotes(amountDownVotes + 1)

        await votingApi.addVote(radar?.group?.id || 0, radar?.id, phenomenon?.id, {
          up: false,
        });
      }
    
      

    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: {error},
      })
    }
  };

  useEffect(() => {
    const setStatus = async() => {
      const {
        data: { plus_votes, minus_votes },
      } = await votingApi.getVote(radar?.group?.id || 0, radar?.id, phenomenon?.id);
      
      const sum = Number(plus_votes - minus_votes);
  
      if (sum === 0) {
        setVoteStatus(VOTING_STATUS.none);
      } else {
        setVoteStatus(Number(sum) === 1 ? VOTING_STATUS.up : VOTING_STATUS.down);
      }
    }
    setStatus()
  }, []);

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

  const onVisibilityHandler = async () => {
    const hiddenPhenomenaUpdated = hiddenPhenomena?.concat(phenomenon?.id);
    await dispatch({
      type: ACTIONS.HIDDENPHENOMENA,
      payload: hiddenPhenomenaUpdated,
    });
    const payload = {
      [`voting/${radar?.group?.id || 0}/radar/${radar.id}`]: {
        hidden: hiddenPhenomenaUpdated,
      },
    };
    await votingApi.addHiddenPhenomenaVotes(radar?.group?.id || 0, radar?.id, payload);
  };
  return (
    <Container>
      <WildCardWrapper className='left' data-href={getPhenomenonUrl(radar?.id, phenomenon)}>
        <WildCard
          className= {`icon-issue ${iconClassName}`}
          backgroundColor={backgroundColor}
        >
          {phenomenon?.content?.title}
        </WildCard>
      </WildCardWrapper>
      <VoteWrapper>
        <VoteAmountResult>{amountUpVotes - amountDownVotes}</VoteAmountResult>
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
              {amountUpVotes}
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
              {amountDownVotes}
            </VoteAmountItem>
          </ButtonVote>
          <span>)</span>
        </ButtonGroup>
      </VoteWrapper>
      {/* <a onClick={onVisibilityHandler}>
        <span className=" af-custom-eye-blocked" style={{fontSize: '1.3em', color: tokens.ColorBlue, cursor: 'pointer'}}/>
      </a> */}
    </Container>
  );
};

export default VoteResult;
