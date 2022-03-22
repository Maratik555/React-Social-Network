import {authMe, resultCodeEnum, resultCodeForCapcha, securityAPI} from "../API/api"
import {stopSubmit} from "redux-form"

const SET_USERS_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

let initialState = {
    userId:null,
    email:null,
    login:null,
    isAuth:false,
    captchaUrl:null
}
export type initialStateType = typeof initialState

const authReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case SET_USERS_DATA:
        case GET_CAPTCHA_URL:
            return {
                use: 'ghghg',
              ...state,
              ...action.payload
            }

        default: return state
    }
}

type payloadType = {
    userId:number
    email:string
    login:string
    isAuth:boolean
}

type setAuthUserDataType = {
    type: typeof SET_USERS_DATA,
    payload: payloadType
}

export const setAuthUserData = (userId:number|null,email:string|null,login:string|null,isAuth:boolean):setAuthUserDataType =>
  <setAuthUserDataType>({type: SET_USERS_DATA, payload: {userId, email, login, isAuth}})

type getCaptchaSuccessType = {
    type: typeof GET_CAPTCHA_URL,
    payload: {captchaUrl:string}
}

export const getCaptchaSuccess = (captchaUrl:string):getCaptchaSuccessType => ({type:GET_CAPTCHA_URL, payload: {captchaUrl}})

export const getAuthUserData = () => async (dispatch:any) => {
   let meData = await authMe.me()

    if(meData.resultCode ===  resultCodeEnum.Success) {
            let {id,login,email} = meData.data
            dispatch(setAuthUserData(id,email,login,true))
        }
}

export const login = (email:string,password:string,rememberMe:boolean,captcha:any) => async (dispatch:any) => {
   let loginData = await authMe.login(email, password,rememberMe,captcha)

        if(loginData.resultCode === resultCodeEnum.Success) {
            dispatch(getAuthUserData())
        } else {
          if(loginData.resultCode === resultCodeForCapcha.captchaIsRequired) {
            dispatch(getCaptchaUrl())
          }
           let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Error'
            dispatch( stopSubmit('login',{_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
   const response = await securityAPI.getCaptchaUrl()
   const captchaUrl = response.data.url
   dispatch(getCaptchaSuccess(captchaUrl))
}

export const logout = () => async (dispatch:any) => {
   let response = await authMe.logout()

        if(response.data.resultCode === resultCodeEnum.Success) {
            dispatch(setAuthUserData(null,null,null,false))
        }
}

export default authReducer