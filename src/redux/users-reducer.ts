import {usersAPI} from "../API/api"
import {InferActionTypes} from "./redux-store";

// const FOLLOW = 'FOLLOW'
// const UNFOLLOW = 'UNFOLLOW'
// const SET_USERS = 'SET_USERS'
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
// const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'


let initialState = {
    users: [] as Array<number>,
    pageSize: 5,
    totalItemCount: 0,
    currentPage: 1,
    isFetching: true,
    following: [] as Array<number>
}

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case "FOLLOW" :
            return {
                ...state,
                users: state.users.map(u => {
                    // @ts-ignore
                    if (u.id === action.userId) {
                        // @ts-ignore
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'UNFOLLOW' :
            return {
                ...state,
                users: state.users.map(u => {
                    // @ts-ignore
                    if (u.id === action.userId) {
                        // @ts-ignore
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'SET_USERS' : {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE' : {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT' : {
            return {...state, totalItemCount: action.count}
        }
        case 'TOGGLE_IS_FETCHING' : {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING' : {
            return {
                ...state, following: action.isFetching
                    ? [...state.following, action.userId]
                    : state.following.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

type ActionTypes = InferActionTypes<typeof action>

export const action = {
 followSuccess : (userId: number) => ({type: 'FOLLOW', userId} as const),
 unfollowSuccess : (userId: number) => ({type: 'UNFOLLOW', userId} as const),
 setUsers : (users: Array<number>) => ({type: 'SET_USERS', users} as const),
 setCurrentPage : (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
 setTotalUsersCount : (totalItemCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', count: totalItemCount} as const),
 toggleIsFetching : (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
 toggleFollowing : (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING',
    isFetching,
    userId
} as const)
}

export const getUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(action.toggleIsFetching(true))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(action.setCurrentPage(page))
        dispatch(action.toggleIsFetching(false))
        dispatch(action.setUsers(data.items))
        dispatch(action.setTotalUsersCount(data.totalCount))
    }
}


export const follow = (userId: number) => {
    return async (dispatch: any) => {
        (action.toggleFollowing(true, userId))
        let response = await usersAPI.follow(userId)
        if (response.data.resultCode === 0) {
            dispatch(action.followSuccess(userId))
        }
        dispatch(action.toggleFollowing(false, userId))
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        (action.toggleFollowing(true, userId))
        let response = await usersAPI.unfollow(userId)

        if (response.data.resultCode === 0) {
            dispatch(action.unfollowSuccess(userId))
        }
        dispatch(action.toggleFollowing(false, userId))
    }
}

export default usersReducer