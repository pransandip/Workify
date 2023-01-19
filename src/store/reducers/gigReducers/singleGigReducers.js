import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all create gig data
 */

const initialState = {
  completeData: [],
  activeData: [],
  allCompleteData: [],
};

export function singleDayGigReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_SINGLE_DAY_BUSINESS_ACTIVE_GIG:
      return {
        ...newState,
        activeData: [...action.payload],
      };

    case ACTIONS.GET_SINGLE_DAY_BUSINESS_COMPLETE_GIG:
      return {
        ...newState,
        completeData: [...action.payload],
      };

    case ACTIONS.GET_ALL_COMPLETE_GIG:
      return {
        ...newState,
        allCompleteData: [...action.payload],
      };

    default:
      return state;
  }
}
