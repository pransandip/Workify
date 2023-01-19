import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all province data
 */

const initialState = {};

export function provinceReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_ALL_PROVINCE_DATA:
      return {
        ...newState,
        data: [...action.payload],
      };

    default:
      return state;
  }
}
