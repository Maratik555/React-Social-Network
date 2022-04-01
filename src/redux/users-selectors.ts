import {AppStateType} from './redux-store'
// import {createSelector} from "reselect"

// export const getUserSelector = createSelector(mstpGetUsers,(users) => users.filter(u => true)

// export const mstpGetUsers = (state:AppStateType) => state.usersPage.users
// export const getPageSize = (state:AppStateType) => state.usersPage.pageSize
// export const getTotalUsersCount = (state:AppStateType) => state.usersPage.totalItemCount
// export const getCurrentPage = (state:AppStateType) => state.usersPage.currentPage
// export const getFollowing = (state:AppStateType) => state.usersPage.following


// ==========
export const getUsersFilter = (state:AppStateType) => state.usersPage.filter
export const getIsFetching = (state:AppStateType) => state.usersPage.isFetching