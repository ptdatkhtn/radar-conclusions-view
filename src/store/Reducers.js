import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case ACTIONS.PHENOMENONDATA:
      return {
        ...state,
        phenonmenaData: action.payload
      }
    case ACTIONS.RADAR:
    return {
      ...state,
      radar: action.payload
    }
    case ACTIONS.UPDATE_STATUS:
    return {
      ...state,
      status: action.payload
    }
    case ACTIONS.HIDDENPHENOMENARATING:
    return {
      ...state,
      hiddenPhenomenaRating: action.payload
    }
    case ACTIONS.HIDDENPHENOMENAVOTING:
      return {
        ...state,
        hiddenPhenomenaVoting: action.payload
    }

    case ACTIONS.ISFLIP:
      return {
          ...state,
          isFlip: action.payload
      }
      case ACTIONS.MODE:
        return {
            ...state,
            keyMode: action.payload
        }
        
      case ACTIONS.AVGMEDIAN:
        return {
            ...state,
            keyAvgMedian: action.payload
        }
    
    default:
      return state
  }
}

export default reducers