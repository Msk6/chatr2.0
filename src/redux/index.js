import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { checkExpiredToken, fetchChannels, fetchMessages } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(checkExpiredToken());
store.dispatch(fetchChannels());
store.dispatch(fetchMessages(159));

export default store;
