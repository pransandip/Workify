import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all multiple gig data
 */

const initialState = {
  completeData: [],
  activeData: [],
};

export function multipleDayGigReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_MULTIPLE_DAY_BUSINESS_ACTIVE_GIG:
      return {
        ...newState,
        activeData: [...action.payload],
      };

    case ACTIONS.GET_MULTIPLE_DAY_BUSINESS_COMPLETE_GIG:
      return {
        ...newState,
        completeData: [...action.payload],
      };

    default:
      return state;
  }
}
