import { SET_CHANNELS, ADD_CHANNEL } from "../actions"

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      const channels = action.payload;
      return channels;
    case ADD_CHANNEL:
      const newChannel = action.payload;
      return [...state, newChannel];
    default:
      return state;
  }
};

export default reducer;
