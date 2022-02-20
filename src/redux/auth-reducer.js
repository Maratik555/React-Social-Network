import {authMe, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USERS_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

let initialState = {
    userId:null,
    email:null,
    login:null,
    isAuth:false,
    captchaUrl:null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA:
        case GET_CAPTCHA_URL:
            return {
              ...state,
              ...action.payload
            }

        default: return state
    }
}

export const setAuthUserData = (userId,email,login,isAuth) =>
  ({type:SET_USERS_DATA,payload: {userId,email,login,isAuth}})

export const getCaptchaSuccess = (captchaUrl) => ({type:GET_CAPTCHA_URL, payload: {captchaUrl}})

export const getAuthUserData = () => async (dispatch) => {
   let response = await authMe.me()

    if(response.data.resultCode === 0) {
            let {id,login,email} = response.data.data;
            dispatch(setAuthUserData(id,email,login,true))
        }
}

export const login = (email,password,rememberMe,captcha) => async (dispatch) => {
   let response = await authMe.login(email, password,rememberMe,captcha)

        if(response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
          if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
          }
           let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Error'
            dispatch( stopSubmit('login',{_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
   const response = await securityAPI.getCaptchaUrl()
   const captchaUrl = response.data.url
   dispatch(getCaptchaSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
   let response = await authMe.logout()

        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null,null,null,false))
        }
}

export default authReducer