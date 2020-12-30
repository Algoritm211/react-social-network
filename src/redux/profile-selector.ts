import {AppStateType} from "./redux-store";


export const getUserPhoto = (state: AppStateType) => {
  return state.profilePage.profile?.photos.small
}