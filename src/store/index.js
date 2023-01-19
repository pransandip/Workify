import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { persistReducer, persistStore } from "redux-persist";
import RootReducer from "./reducers";
import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key: "root",
//     storage: storage,

// };

// /**
//  * Persist reducer
//  */
// const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
