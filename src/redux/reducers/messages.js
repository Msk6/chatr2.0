import { SET_MESSAGES, POST_MESSAGE } from "../actions/actionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      const messages = action.payload;
      return messages;

    case POST_MESSAGE:
      const newMessege = action.payload;
      return [...state, newMessege];
    default:
      return state;
  }
};

export default reducer;
