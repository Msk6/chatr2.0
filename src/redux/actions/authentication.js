import {SET_CURRENT_USER} from "./actionTypes";
import {fetchChannels} from "./channels"
import decode from "jwt-decode"
import Cookies from "js-cookie"

import instance from "./instance";

export const authenticateUser = (userData, history, type) => 
    async dispatch => {
        try{
            let response = await instance.post(`/${type}/`, userData)
            let { token } = response.data
            dispatch(setCurrentUser(token)) 
            dispatch(fetchChannels())
            console.log(history)
            history.push("/login")
            
        } catch (error) {
            console.error(error)
        } }

export const logout = () => setCurrentUser()

const setUserToken = (token) => {
    if (token){
        console.log("there is a token")
        instance.defaults.headers.Authorization = `jwt ${token}`
        Cookies.set("token", token)
    } else {
        delete instance.defaults.headers.Authorization 
        console.log("after delete token from header")
        Cookies.remove("token")
        console.log("after remove token from cookies")
    }
    
}

const setCurrentUser = (token) => {
    console.log("setcurrentuser")
    setUserToken(token)
    console.log("returned from setUserToken (removed and deleted token)")
    //console.log("token decode: ",decode(token))
    const user = token? decode(token): null
    return ({
        type: SET_CURRENT_USER,
        payload: user
    })
}

export const checkExpiredToken = () => {
        const token = Cookies.get("token")
        console.log("token from cookies ",token)
        if (token) {
            console.log("there is a token inside checkExpiredToken")
            const currentTime = Date.now() / 1000
            const userData = decode(token)
            if (userData.exp >= currentTime){
                return setCurrentUser(token)
            }
        } 
        return setCurrentUser()
}