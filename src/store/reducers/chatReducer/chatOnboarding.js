import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling chat onboarding
 */

const initialState = {};

export function chatUserData(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.CHAT_USER_DATA:
      return {
        ...newState,
        ...action.payload,
      };

    default:
      return state;
  }
}
