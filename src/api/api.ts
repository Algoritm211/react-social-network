import axios from 'axios'
import {PhotosType, UsersType} from "../types/types";

export const instanceAxios = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '91cc5a84-d625-478b-a406-09acdffa3140'
  }
})

/// common-api-type
export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCaptchaIsRequired {
  CaptchaIsRequired = 10
}

interface IResponseAPI {
  data: object,
  resultCode: ResultCodesEnum,
  messages: Array<string>
}
///

/// users-api-types
export interface IGetUsers extends IResponseAPI{
    items: Array<UsersType>,
    totalCount: number,
    error: string | null
}

export interface Ifollow extends IResponseAPI{}
export interface Iunfollow extends IResponseAPI{}



//  profile-api-types
export interface ISetStatus extends IResponseAPI {}
export interface ISetPhoto extends IResponseAPI {
  data: {
    photos: PhotosType
  }
}
export interface ISetUserProfile extends IResponseAPI {}

// auth-user-types
export interface IAuthUser{
  data: {
    id: number,
    email: string,
    login: string
  }
  resultCode: ResultCodesEnum | ResultCaptchaIsRequired,
  messages: Array<string>
}
export interface ILoginUser extends IResponseAPI {
  data: {
    userId: number
  }
}
export interface ILogoutUser extends IResponseAPI {}

// security-user-types
export interface IGetCaptchaURL extends IResponseAPI {
  url: string
}
