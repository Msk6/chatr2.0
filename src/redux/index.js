import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk";

import reducer from "./reducers";

import { fetchChannels } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

store.dispatch(fetchChannels());

export default store;
