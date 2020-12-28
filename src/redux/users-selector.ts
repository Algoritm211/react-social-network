import { createSelector } from 'reselect'
import {AppStateType} from "./redux-store";

const getUsersSelector = (state: AppStateType) => state.usersPage.users

export const getUsers = createSelector(
  [getUsersSelector],
  (users) => {
    return users.filter(user => true)
  }
)

export const getUsersPerPage = (state: AppStateType) => {
  return state.usersPage.usersPerPage
}
export const getTotalUsersCountUsers = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}
export const getToggleFollowing = (state: AppStateType) => {
  return state.usersPage.toggleFollowing
}

export const getFilter = (state: AppStateType) => {
  return state.usersPage.filter
}