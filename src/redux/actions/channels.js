import { SET_CHANNELS, ADD_CHANNEL } from "./actionTypes";
import instance from "./instance";

export const fetchChannels = () => async (dispatch) => {
  try {
    const res = await instance.get("/channels/");
    const channels = res.data;
    dispatch({
      type: SET_CHANNELS,
      payload: channels,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addChannel = (newChannel, closeModal) => async dispatch => {
  try {
    const res = await instance.post("/channels/create/",newChannel.name);
    const channel = res.data;
    dispatch({
      type: ADD_CHANNEL,
      payload: channel,
    });
    closeModal();
  }catch(error){
    console.error(error);
  }
};
