import {authMe} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USERS_DATA = 'SET_USER_DATA'

let initialState = {
    userId:null,
    email:null,
    login:null,
    isAuth:false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId,email,login,isAuth) =>({type:SET_USERS_DATA,payload:
      {userId,email,login,isAuth}})

export const getAuthUserData = () => (dispatch) => {
   return authMe.me()
    .then(response => {
        if(response.data.resultCode === 0) {
            let {id,login,email} = response.data.data;
            dispatch(setAuthUserData(id,email,login,true))
        }
    })
}

export const login = (email,password,rememberMe) => (dispatch) => {
    authMe.login(email, password,rememberMe)
    .then(response => {
        if(response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        }else {
           let message = response.data.message.length > 0 ? response.data.message[0] : 'Error'
            dispatch( stopSubmit('login',{_error: message}))
        }
    })
}

export const logout = () => (dispatch) => {
    authMe.logout()
    .then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null,null,null,false))
        }
    })
}

export default authReducer