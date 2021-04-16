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
    case ACTIONS.HIDDENPHENOMENA:
    return {
      ...state,
      hiddenPhenomena: action.payload
    }
    default:
      return state
  }
}

export default reducers