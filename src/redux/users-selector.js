import { createSelector } from 'reselect'

const getUsersSelector = (state) => state.usersPage.users

export const getUsers = createSelector(
  [getUsersSelector],
  (users) => {
    return users.filter(user => true)
  }
)

export const getUsersPerPage = (state) => {
  return state.usersPage.usersPerPage
}
export const getTotalUsersCountUsers = (state) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}
export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}
export const getToggleFollowing = (state) => {
  return state.usersPage.toggleFollowing
}

export const getFilter = (state) => {
  return state.usersPage.filter
}