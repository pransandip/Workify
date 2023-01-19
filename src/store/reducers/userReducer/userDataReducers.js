import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all user data
 */

const initialState = {};

export function userData(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOGOUT":
      return initialState;

    case ACTIONS.UPDATE_USER_DATA:
      return {
        ...newState,
        data: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
