import { SET_CURRENT_USER } from "./actionTypes";
import { fetchChannels } from "./channels";
import decode from "jwt-decode";
import Cookies from "js-cookie";
import instance from "./instance";

export const authenticateUser = (userData, history, type) => async (
  dispatch
) => {
  try {
    let response = await instance.post(`/${type}/`, userData);
    let { token } = response.data;
    dispatch(setCurrentUser(token));
    history.push("/");
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => setCurrentUser();

const setUserToken = (token) => {
  if (token) {
    instance.defaults.headers.Authorization = `jwt ${token}`;
    Cookies.set("token", token);
  } else {
    delete instance.defaults.headers.Authorization;
    Cookies.remove("token");
  }
};

const setCurrentUser = (token) => (dispatch) => {
  setUserToken(token);
  const user = token ? decode(token) : null;
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
  dispatch(fetchChannels());
};

export const checkExpiredToken = () => {
  const token = Cookies.get("token");
  if (token) {
    const currentTime = Date.now() / 1000;
    const userData = decode(token);
    if (userData.exp >= currentTime) {
      return setCurrentUser(token);
    }
  }
  return setCurrentUser();
};
