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
    const res = await instance.post("/channels/create/",newChannel);
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

let timer = null
export const startChannelTimer = () => dispatch => {
  console.log("start timer")
  timer = setInterval(() => dispatch(fetchChannels()), 10000)
}

export const stopChannelTimer = () => dispatch =>{
  console.log("stop timer")
   clearInterval(timer)
}
