import {postsAPI, profileAPI, ProfileType, ResultCodeEnum, usersAPI} from '../API/api'
import profile from '../components/Profile/Profile'
import {AppStateType, BaseThunkType} from './redux-store'

// const SET_USER_PROFILE = 'SET_USER_PROFILE'
// const SET_STATUS = 'SET_STATUS'
// const DELETE_POST = 'DELETE_POST'
// const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

export type Nullable<T> = null | T

let initialState = {
    posts: [],
    profile: null as Nullable<ProfileType>,
    status: ''
}

type StateType = typeof initialState

type ActionTypes = ReturnType<typeof addPostAction> | ReturnType<typeof setUserProfile> |
    ReturnType<typeof setStatus> | ReturnType<typeof deletePost> | ReturnType<typeof savePhotoSuccess>


const profileReducer = (state: StateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state, posts: action.payload
            }

        case 'DELETE_POST' : {
            // @ts-ignore
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }

        case 'SET_STATUS': {
            return {...state, status: action.status}
        }

        case 'SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            }

        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state, profile: {...profile, photos: action.photos}
            }

        default:
            return state
    }
}

type GetStateType = () => AppStateType
type ThunkType = BaseThunkType<ActionTypes>

export const addPostAction = (payload: any) => ({type: 'ADD_POST', payload} as const)
export const setUserProfile = (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const)
export const setStatus = (status: string) => ({type: 'SET_STATUS', status} as const)
export const deletePost = (postId: number) => ({type: 'DELETE_POST', postId} as const)
export const savePhotoSuccess = (photos: string | null) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)

export const addPosts = (): ThunkType => async (dispatch) => {
    let data = await postsAPI()
    dispatch(addPostAction(data))
}

export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch, getState: GetStateType) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            await dispatch(getUserProfile(userId))
        }
    }

export default profileReducer