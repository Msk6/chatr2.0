import userReducer from "./user";
import channelsReducer from "./channels";
import messagesReducer from "./messages";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  channels: channelsReducer,
  messages: messagesReducer,
});

export default rootReducer;
