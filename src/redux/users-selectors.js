
export const mstpGetUsers = (state) => {
  return state.usersPage.users
}

export const getPageSize = (state) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalItemCount
}

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}

export const getFollowing = (state) => {
  return state.usersPage.following
}