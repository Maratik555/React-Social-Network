import {authMe} from "../API/api";

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
                ...state.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId,email,login) =>({type:SET_USERS_DATA,data:{userId,email,login}})

export const getAuthUserData = () => (dispatch) => {
    authMe.me()
    .then(response => {
        if(response.data.resultCode===0) {
            let {id,login,email} = response.data.data;
            dispatch(setAuthUserData(id,email,login))
        }
    })
}

export default authReducer