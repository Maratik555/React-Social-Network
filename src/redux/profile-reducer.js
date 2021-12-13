import {profileAPI, usersAPI} from "../API/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
        posts: [
            {id: 1, message: 'Привет, как дела?', like: 10},
            {id: 2, message: 'Marat online', like: 15},
            {id: 3, message: 'Marat offline', like: 25},
            {id: 4, message: 'Marattt online', like: 35},
            {id: 5, message: 'Maratik online', like: 5}
        ],
        newPostText: 'Marat555',
        profile:null,
        status:''
}
const profileReducer = (state=initialState,action) => {
    
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                like: 0
            }
            return {
                ...state, newPostText : '', posts : [...state.posts,newPost]
            }

            case SET_STATUS: {
            return {...state,status: action.status}
                }
            case SET_USER_PROFILE:
                return {
                    ...state,profile:action.profile
                }
                default:
            return state
    }
}

export const addPostAction = (newPostText) => ({type: ADD_POST,newPostText})
export const setUserProfile = (profile) =>({type:SET_USER_PROFILE,profile})
export const setStatus = (status) =>({type:SET_STATUS,status})

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
    })
}

export default profileReducer