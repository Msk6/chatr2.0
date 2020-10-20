import userReducer from "./user"
import channelsReducer from "./channels";
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    user: userReducer,
  channels: channelsReducer,
})

export default rootReducer