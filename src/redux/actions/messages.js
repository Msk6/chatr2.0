import { SET_MESSAGES, POST_MESSAGE } from "./actionTypes";
import instance from "./instance";

export const fetchMessages = (channelID) => async (dispatch) => {
  try {
    const res = await instance.get(`/channels/${channelID}/`);
    const messages = res.data;
    dispatch({
      type: SET_MESSAGES,
      payload: messages,
    });
  } catch (error) {
    console.error(error);
  }
};


export const PostMessages = (channelID, message) => async (dispatch) => {
  try {
    const res = await instance.post(`channels/${channelID}/send/ `, message);
    const newMessage = res.data;
    dispatch({
      type: POST_MESSAGE,
      payload: newMessage,
    });
  } catch (error) {
    console.error(error);
  }
};

let timer = null
export const startTimer = (channelID) => dispatch => {
  console.log("start timer")
  timer = setInterval(() => dispatch(fetchMessages(channelID)), 3000)
}

export const stopTimer = () => dispatch =>{
  console.log("stop timer")
   clearInterval(timer)
}


// export const updateMesages = (time, channelID) => async dispatch =>{
//   try{
//     const response = await instance.get(`channels/${channelID}/?latest=${time}`)
//     const newMessages = response.data
//     dispatch({
//       type: POST_MESSAGE,
//       payload: newMessages,
//     })
//   } catch (error) {
//     console.error(error)
//   }

// }
