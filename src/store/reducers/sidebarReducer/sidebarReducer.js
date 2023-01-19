import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all industry data
 */

const initialState = {
  activeState: "HomePage",
};

export function sidebarReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.SIDE_BAR_STATE:
      return {
        ...newState,
        activeState: action.payload,
      };

    default:
      return state;
  }
}
