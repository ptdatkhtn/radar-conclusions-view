import { createContext, useState, useReducer, useEffect, useCallback } from 'react'
import reducers from './Reducers'
import { ACTIONS } from './Actions'
import { VOTING_STATUS } from '../constants'
import { getRadar, getPhenomenaTypes } from '@sangre-fp/connectors/drupal-api';
import radarDataApi from '@sangre-fp/connectors/radar-data-api';
import {getPhenomena} from '../helpers/phenomenonFetcher'
import { votingApi, ratingApi } from '../helpers/fetcher';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const initialState = {
    status: VOTING_STATUS.none,
    vote: {},
    phenonmenaData: [],
    error: {},
    radar: {},
    hiddenPhenomenaRating: [],
    hiddenPhenomenaVoting: [],
    isFlip: false,
    keyMode: 1,
    keyAvgMedian: 1

}

export const DataContext = createContext(initialState)

export const DataProvider = ({children, node}) => {
    NProgress.configure({ minimum: 0.1 })
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [state, dispatch] = useReducer(reducers, initialState)

    const fetchAllPhenomenonByRadarIdAndGroupId = useCallback(
        async () => {
            let phenomenaIds = []
            let groups = [0]

            NProgress.start()
            NProgress.set(0.4)

            // node=194690
            await Promise.all([
                radarDataApi.getRadar(node).then(radar => {
                     /* eslint-disable */
                    Object.keys(radar?.data?.phenomena).map(async (pid) => {
                        phenomenaIds.push(radar?.data?.phenomena[pid]?.id)
                    })
                }),
                getRadar(node).then ((radar) => {
                    dispatch({
                        type: ACTIONS.RADAR,
                        payload: radar
                    })
    
                    groups = groups.concat(radar?.group?.id)
                })
            ])
              
            const page = 0
            const size = phenomenaIds?.length || 10
            const phenonmena = []
            const groupVotingParam  = groups[1] ? groups[1] : groups[0]

            await getPhenomena({ phenomena:phenomenaIds, undefined, groups, page, size }).then(
                async (data) => {
                    const types = await getPhenomenaTypes(groupVotingParam);
                    data?.result.map((phenonmenon) => {
                        types?.map((type) => {
                            if (String(phenonmenon?.content?.type) === String(type?.id)) {
                                phenonmenon['content-type-alias'] = type.alias;
                                phenonmenon['content-type-title'] = type.title;
                                phenonmena?.push(phenonmenon);
                                if(String(phenonmenon?.content?.type).includes('fp:doc-types')){
                                    const nameCustomType = String(phenonmenon?.content?.type).split('/')[3]
                                    phenonmenon['color'] = String(type?.style?.color)
                                } else {
                                    phenonmenon['color'] = 'none'
                                }
                            }
                        });
                    });
                    
                    const res = await ratingApi.getFlipAxisAfterSaved(groups[1], node)

                    dispatch({
                        type: ACTIONS.ISFLIP,
                        payload: res.data?.isFlip
                    })


                    //fetch all votes for all phenomenon
                    await votingApi.getAllVotes(groupVotingParam, node).then(
                        async ({ data }) => {
                            Object.keys(data)?.map(async (phe) => {
                                const pheURL = String(Object.keys(data[phe]));
                                const pheId = pheURL.split('/');
                                phenonmena && !!phenonmena.length && phenonmena.forEach(phenomenon => {
                                    if (data[phe][`/${groupVotingParam}/radar/${node}/phenomenon/${pheId[5]}`] && phenomenon.id === pheId[5]) {
                                        phenomenon['vote_result'] = data[phe][`/${groupVotingParam}/radar/${node}/phenomenon/${pheId[5]}`];
                                    }
                                });
                            });
                        }
                    );

                    // fetch all ratings for all phenomenon
                    await ratingApi.getAllRatings(groupVotingParam, node).then(
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


                    await votingApi.getAllHiddenVotes(groupVotingParam, node)
                        .then(async (hiddenPhenomena) => {
                            dispatch({
                                type: ACTIONS.HIDDENPHENOMENAVOTING,
                                payload:  hiddenPhenomena?.data[`voting/${groupVotingParam}/radar/${node}`]?.hidden || []
                            })
                        })

                    await ratingApi.getAllHiddenRatings(groupVotingParam, node)
                        .then(async (hiddenPhenomena) => {
                            const hiddenRatingsResults = hiddenPhenomena?.data[`rating/${groupVotingParam}/radar/${node}`]?.hidden
                            hiddenRatingsResults && !!hiddenRatingsResults.length && dispatch({
                                type: ACTIONS.HIDDENPHENOMENARATING,
                                payload: hiddenRatingsResults
                            })
                        })

                    dispatch({
                        type: ACTIONS.PHENOMENONDATA,
                        payload: phenonmena.filter((p) => p.hasOwnProperty('vote_result') || (p.hasOwnProperty('rating_x') && p.hasOwnProperty('rating_y'))) 
                    });
                }
            )
            NProgress.done(true)
            NProgress.remove()
            setIsLoadingData(false)
            return []

            
        },
        []
    )

    useEffect(() => {
        try {
            fetchAllPhenomenonByRadarIdAndGroupId()
            dispatch({type: ACTIONS.ERROR, payload: null})
        } catch (error) {
            dispatch({type: ACTIONS.ERROR, payload: {error}})
        }
    },[dispatch])

    return(
        <>
        {
            !isLoadingData &&
            <DataContext.Provider value={{state, dispatch}}>
                {children}
            </DataContext.Provider>
        }
        </>
    )
}