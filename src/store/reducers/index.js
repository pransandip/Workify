import { combineReducers } from "redux";
import { userData } from "./userReducer/userDataReducers";
import { provinceReducer } from "./provinceReducer/index";
import { industryReducer } from "./industryReducer/index";
import { createGigData } from "./createGigReducer/index";
import { locationReducer } from "./locationReducer/index";
import { singleDayGigReducer } from "../reducers/gigReducers/singleGigReducers";
import { multipleDayGigReducer } from "../reducers/gigReducers/multipleGigReducers";
import { gigDetailsReducer } from "./gigDetailsReducer/gigDataReducer";
import { sidebarReducer } from "./sidebarReducer/sidebarReducer";
import { chatUserData } from "./chatReducer/chatOnboarding";
import { chatDataReducer } from "./chatReducer/chatData";

const RootReducer = combineReducers({
  userData: userData,
  provinceData: provinceReducer,
  industryData: industryReducer,
  gigData: createGigData,
  locationData: locationReducer,
  singleDayGigData: singleDayGigReducer,
  multipleDayGigData: multipleDayGigReducer,
  gigDetils: gigDetailsReducer,
  sideBar: sidebarReducer,
  chatUser: chatUserData,
  chatData: chatDataReducer,
});

export default RootReducer;
