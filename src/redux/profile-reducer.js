import {usersAPI} from "../API/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST = 'UPDATE_NEW_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';


let initialState = {
        posts: [
            {id: 1, message: 'Привет, как дела?', like: 10},
            {id: 2, message: 'Marat online', like: 15},
            {id: 3, message: 'Marat offline', like: 25},
            {id: 4, message: 'Marattt online', like: 35},
            {id: 5, message: 'Maratik online', like: 5}
        ],
        newPostText: 'Marat555',
        profile:null
}
const profileReducer = (state=initialState,action) => {
    
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                like: 0
            }
            return {
                ...state, newPostText : '', posts : [...state.posts,newPost]
            }
            case UPDATE_NEW_POST:
            return  {
                ...state,newPostText : action.newText
            }
            case SET_USER_PROFILE:
                return {
                    ...state,profile:action.profile
                }
                default:
            return state
    }
}

export const addPostAction = () => ({type: ADD_POST})
export const setUserProfile = (profile) =>({type:SET_USER_PROFILE,profile})
export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}


export const updatePostAction = (text) => ({type: UPDATE_NEW_POST, newText: text})


export default profileReducer