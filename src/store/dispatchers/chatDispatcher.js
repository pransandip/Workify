import { store } from "../../store";
import { ACTIONS } from "../../store/actions";

const dispatchChatUserData = (payload) => {
  store.dispatch({
    type: ACTIONS.CHAT_USER_DATA,
    payload: payload,
  });
};

const dispatchChatData = (payload) => {
  store.dispatch({
    type: ACTIONS.ALL_CHAT_DATA,
    payload: payload,
  });
};

export { dispatchChatUserData, dispatchChatData };
