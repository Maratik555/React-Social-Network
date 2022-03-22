import {profileAPI, ProfileType, usersAPI} from "../API/api"
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
const profileReducer = (state= initialState,action:any) => {
    
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

export const addPostAction = (newPostText:string) => ({type: ADD_POST,newPostText})
export const setUserProfile = (profile:any) => ({type:SET_USER_PROFILE,profile})
export const setStatus = (status:string) => ({type:SET_STATUS,status})
export const deletePost = (postId:number) => ({type:DELETE_POST,postId})
export const savePhotoSuccess = (photos:string|null) => ({type:SAVE_PHOTO_SUCCESS,photos})


export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
}

export const getStatus = (userId:number) => async (dispatch:any) => {
  let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status:string) => async (dispatch:any) => {
   let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file:any) => async (dispatch:any) => {
   let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile:ProfileType) => async (dispatch:any,getState:any) => {
   const userId = getState().auth.userId
   const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
}

export default profileReducer