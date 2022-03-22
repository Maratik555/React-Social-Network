import {AppStateType} from "./redux-store";
// import {createSelector} from "reselect";

export const mstpGetUsers = (state:AppStateType) => {
  // @ts-ignore
  return state.usersPage.users
}

// export const getUser = createSelector(mstpGetUsers,(users) => {
//   return users.filter(u => true)
// }

export const getPageSize = (state:AppStateType) => {
  // @ts-ignore
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state:AppStateType) => {
  // @ts-ignore
  return state.usersPage.totalItemCount
}

export const getCurrentPage = (state:AppStateType) => {
  // @ts-ignore
  return state.usersPage.currentPage
}

export const getIsFetching = (state:AppStateType) => {
  // @ts-ignore
  return state.usersPage.isFetching
}

export const getFollowing = (state:AppStateType) => {
  // @ts-ignore
  return state.usersPage.following
}