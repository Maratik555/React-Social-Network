import {ResultCodeEnum, usersAPI, UsersTypes} from '../API/api'
import {BaseThunkType, InferActionTypes} from './redux-store'


let initialState = {
    users: [] as Array<UsersTypes>,
    totalItemCount: 0,
    currentPage: 1,
    isFetching: true,
    following: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'FOLLOW' :
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'UNFOLLOW' :
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'SET_USERS' :
            return {...state, users: action.users}

        case 'SET_CURRENT_PAGE' :
            return {...state, currentPage: action.currentPage}

        case 'SET_TOTAL_USERS_COUNT' :
            return {...state, totalItemCount: action.count}

        case 'TOGGLE_IS_FETCHING' :
            return {...state, isFetching: action.isFetching}

        case 'TOGGLE_IS_FOLLOWING' :
            return {
                ...state, following: action.isFetching
                    ? [...state.following, action.userId]
                    : state.following.filter(id => id !== action.userId)
            }

        case 'SET_FILTER' :
            return { ...state, filter: action.payload }

        default:
            return state
    }
}

type ActionTypes = InferActionTypes<typeof action>

export const action = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersTypes>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalItemCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', count: totalItemCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
    toggleFollowing: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING',
        isFetching,
        userId
    } as const)
}

// type DispatchType = Dispatch<ActionTypes>
type ThunkType = BaseThunkType<ActionTypes>

export const getUsers = (page: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(action.toggleIsFetching(true))
        dispatch(action.setCurrentPage(page))
        dispatch(action.setFilter(filter))

        let data = await usersAPI.getUsers(page,  filter.term, filter.friend)
        dispatch(action.toggleIsFetching(false))
        dispatch(action.setUsers(data.items))
        dispatch(action.setTotalUsersCount(data.totalCount))
    }
}


export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        (action.toggleFollowing(true, userId))

        let response = await usersAPI.follow(userId)

        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(action.followSuccess(userId))
        }
        dispatch(action.toggleFollowing(false, userId))
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        (action.toggleFollowing(true, userId))

        let response = await usersAPI.unfollow(userId)

        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(action.unfollowSuccess(userId))
        }
        dispatch(action.toggleFollowing(false, userId))
    }
}

export default usersReducer