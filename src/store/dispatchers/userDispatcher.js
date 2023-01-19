import { store } from "../../store";
import { ACTIONS } from "../../store/actions";

const dispatchUpdateUserObject = (payload) => {
  store.dispatch({
    type: ACTIONS.UPDATE_USER_DATA,
    payload: payload,
  });
};

export { dispatchUpdateUserObject };
