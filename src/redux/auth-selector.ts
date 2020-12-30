import {AppStateType} from "./redux-store";


export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}

export const getCaptchaURL = (state: AppStateType) => {
  return state.auth.captcha
}

export const getLogin = (state: AppStateType) => {
  return state.auth.login
}

export const getUserPhotoSmall = (state: AppStateType) => {
  return state.auth.photos.small
}