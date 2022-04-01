import {authMe, ResultCodeEnum, ResultCodeForCapcha, securityAPI} from '../API/api'
import {FormAction, stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionTypes} from './redux-store'

// const SET_USERS_DATA = 'auth/SET_USER_DATA'
// const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

let initialState = {
    userId:null as number|null,
    email:null as string|null,
    login:null as string|null,
    isAuth:false,
    captchaUrl:null as string|null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes):InitialStateType => {
    switch (action.type) {
        case 'SET_USERS_DATA':
        case 'GET_CAPTCHA_URL':
            return {
              ...state,
              ...action.payload
            }
        default: return state
    }
}

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    setAuthUserData: (userId:number|null,email:string|null,login:string|null,isAuth:boolean) =>
    ({type: 'SET_USERS_DATA', payload: {userId, email, login, isAuth}} as const),
    getCaptchaSuccess: (captchaUrl:string)=> ({type: 'GET_CAPTCHA_URL', payload: {captchaUrl}} as const)
}

type ThunkType = BaseThunkType<ActionTypes | FormAction>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
   let meData = await authMe.me()

    if(meData.resultCode ===  ResultCodeEnum.Success) {
            let {id,login,email} = meData.data
            dispatch(actions.setAuthUserData(id,email,login,true))
        }
}

export const login = (email:string,password:string,rememberMe:boolean,captcha:any): ThunkType =>
    async (dispatch) => {
   let loginData = await authMe.login(email, password,rememberMe,captcha)

        if(loginData.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData())
        } else {
          if(loginData.resultCode === ResultCodeForCapcha.captchaIsRequired) {
            dispatch(getCaptchaUrl())
          }
           let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Error'
            dispatch( stopSubmit('login',{_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
   const response = await securityAPI.getCaptchaUrl()
   const captchaUrl = response.data.url
   dispatch(actions.getCaptchaSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
   let response = await authMe.logout()
    if(response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setAuthUserData(null,null,null,false))
        }
}

export default authReducer