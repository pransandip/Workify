import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling chat onboarding
 */

const initialState = {};

export function chatDataReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.ALL_CHAT_DATA:
      return {
        ...newState,
        ...action.payload,
      };

    default:
      return state;
  }
}
