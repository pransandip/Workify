import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all location data
 */

const initialState = {
  location: [],
};

export function locationReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_ALL_LOCATION:
      return {
        ...newState,
        location: [...action.payload],
      };

    default:
      return state;
  }
}
