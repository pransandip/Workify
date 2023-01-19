import { store } from "../../store";
import { ACTIONS } from "../../store/actions";

const dispatchUpdateGig = (payload) => {
  store.dispatch({
    type: ACTIONS.UPDATE_USER_DATA,
    payload: payload,
  });
};

export { dispatchUpdateGig };
