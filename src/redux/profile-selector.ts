import {AppStateType} from "./redux-store";


export const getUserPhoto = (state: AppStateType) => {
  return state.profilePage.profile?.photos.small
}

export const getUserName = (state: AppStateType) => {
  return state.profilePage.profile?.fullName
}