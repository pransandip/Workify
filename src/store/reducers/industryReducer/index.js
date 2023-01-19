import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all industry data
 */

const initialState = {};

export function industryReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_ALL_INDUSTRY_DATA:
      return {
        ...newState,
        data: [...action.payload],
      };

    default:
      return state;
  }
}
