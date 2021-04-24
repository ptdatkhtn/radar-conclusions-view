import { createContext, useReducer, useEffect, useCallback } from 'react'
import reducers from './Reducers'
import { startSession } from '../helpers/session';
import { ACTIONS } from './Actions'
import { VOTING_STATUS } from '../constants'
import { getRadar, getPhenomenaTypes } from '@sangre-fp/connectors/drupal-api';
import {getPhenomena} from '../helpers/phenomenonFetcher'
import { votingApi, ratingApi } from '../helpers/fetcher';

const initialState = {
    status: VOTING_STATUS.none,
    vote: {},
    phenonmenaData: [],
    error: {},
    radar: {},
}

export const DataContext = createContext(initialState)

export const DataProvider = ({children, node}) => {
   
    const [state, dispatch] = useReducer(reducers, initialState)

    const fetchAllPhenomenonByRadarIdAndGroupId = useCallback(
        async () => {
            let phenomenaIds = []
            let groups = [0]
            // node=194690
            await getRadar(node).then ((data) => {
                dispatch({
                    type: ACTIONS.RADAR,
                    payload: data
                })
                groups = groups.concat(data?.group?.id)
                Object.keys(data?.phenomena).map(async (pid) => {
                    phenomenaIds.push(pid)
                })
            })
              
            const page = 0
            const size = phenomenaIds?.length || 10
            const phenonmena = []
           
            await getPhenomena({ phenomenaIds, undefined, groups, page, size }).then(
                async (data) => {
                    const types = await getPhenomenaTypes(groups[1]);
                    data?.result.map((phenonmenon) => {
                        types?.map((type) => {
                            if (String(phenonmenon?.content?.type) === String(type?.id)) {
                                phenonmenon['content-type-alias'] = type.alias;
                                phenonmenon['content-type-title'] = type.title;
                                phenonmena?.push(phenonmenon);
                            }
                        });
                    });

                    //fetch all votes for all phenomenon
                    await votingApi.getAllVotes(groups[1], node).then(
                        async ({ data }) => {
                            Object.keys(data)?.map(async (phe) => {
                                const pheURL = String(Object.keys(data[phe]));
                                const pheId = pheURL.split('/');
                                phenonmena && !!phenonmena.length && phenonmena.forEach(phenomenon => {
                                    if (phenomenon.id === pheId[5]) {
                                        phenomenon['vote_result'] = data[phe][`/${groups[1]}/radar/${node}/phenomenon/${pheId[5]}`];
                                    }
                                });
                            });
                        }
                    );

                    // fetch all ratings for all phenomenon
                    await ratingApi.getAllRatings(groups[1], node).then(
                        async ({data}) => {
                            Object.keys(data)?.map( async(phe) => {
                                const pheId = phe.split('/')
                                !!phenonmena?.length && phenonmena?.forEach(phenomenon => { 
                                    if(String(phenomenon?.id) === String(pheId[5]) && String(pheId[6]) ==='x') {
                                        phenomenon['rating_x'] = data[phe]
                                    }
                                    if(String(phenomenon?.id) === String(pheId[5]) && String(pheId[6]) ==='y') {
                                        phenomenon['rating_y'] = data[phe]
                                    }
                                })
                            })  
                        }
                    )
                    dispatch({
                        type: ACTIONS.PHENOMENONDATA,
                        payload: phenonmena.filter((p) => p.hasOwnProperty('vote_result') || (p.hasOwnProperty('rating_x') && p.hasOwnProperty('rating_y'))) 
                    });
                }
            )
            return []
        },
        [dispatch]
    )

    useEffect(() => {
        try {
            (async () => {
                await startSession()
            })();

            fetchAllPhenomenonByRadarIdAndGroupId()
            dispatch({type: ACTIONS.ERROR, payload: null})
        } catch (error) {
            dispatch({type: ACTIONS.ERROR, payload: {error}})
        }
    },[dispatch, fetchAllPhenomenonByRadarIdAndGroupId])

    return(
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}