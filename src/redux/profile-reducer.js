import {profileAPI, usersAPI} from "../API/api"
import profile from "../components/Profile/Profile"

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
        posts: [
            {id: 1, message: 'Привет, как дела?', like: 10},
            {id: 2, message: 'Marat online', like: 15},
            {id: 3, message: 'Marat offline', like: 25},
            {id: 4, message: 'Marattt online', like: 35},
            {id: 5, message: 'Maratik online', like: 5}
        ],
        newPostText: 'Marat555',
        profile: null,
        status: ''
}
const profileReducer = (state= initialState,action) => {
    
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: action.newPostText,
                like: 1
            }
            return {
                ...state, newPostText : '', posts : [...state.posts,newPost]
            }

            case DELETE_POST : {

            return {...state, posts : state.posts.filter(p => p.id !== action.postId)}
        }

            case SET_STATUS: {
            return {...state,status: action.status}
                }

            case SET_USER_PROFILE:
                return {
                    ...state,profile: action.profile
                }

                case SAVE_PHOTO_SUCCESS:
                return {
                    ...state,profile:{...profile, photos: action.photos}
                }

                default: return state
    }
}

export const addPostAction = (newPostText) => ({type: ADD_POST,newPostText})
export const setUserProfile = (profile) => ({type:SET_USER_PROFILE,profile})
export const setStatus = (status) => ({type:SET_STATUS,status})
export const deletePost = (postId) => ({type:DELETE_POST,postId})
export const savePhotoSuccess = (photos) => ({type:SAVE_PHOTO_SUCCESS,photos})


export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
   let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
   let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch,getState) => {
   const userId = getState().auth.userId
   const response = await profileAPI.saveProfile(profile)
  debugger
        if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
}

export default profileReducer