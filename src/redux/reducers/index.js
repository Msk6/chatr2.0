import { combineReducers } from "redux";

import channelsReducer from "./channels";

const rootReducer = combineReducers({
  channels: channelsReducer,
})

export default rootReducer
