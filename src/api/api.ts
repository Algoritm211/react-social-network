import axios from 'axios'
import {PhotosType, ProfileType, UsersType} from "../types/types";

const instanceAxios = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '91cc5a84-d625-478b-a406-09acdffa3140'
  }
})

/// common
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

interface IGetUsers extends IResponseAPI{
    items: Array<UsersType>,
    totalCount: number,
    error: string | null
}

interface Ifollow extends IResponseAPI{}
interface Iunfollow extends IResponseAPI{}

export const usersAPI = {
  getUsers(currentPage: number, usersPerPage: number) {
    return instanceAxios.get<IGetUsers>(`users?page=${currentPage}&count=${usersPerPage}`)
              .then(response => {
                return response.data
              })
  },

  follow(userId: number) {
    return instanceAxios.post<Ifollow>(`follow/${userId}`)
        .then(response => {
          return response.data
        })
  },

  unfollow(userId: number) {
    return instanceAxios.delete<Iunfollow>(`follow/${userId}`)
          .then(response => {
            return response.data
          })
  }
}


interface ISetStatus extends IResponseAPI {}
interface ISetPhoto extends IResponseAPI {
  data: {
    photos: PhotosType
  }
}
interface ISetUserProfile extends IResponseAPI {}

export const profileAPI = {
  getProfile(userId: number | null) {
    return instanceAxios.get<ProfileType>(`profile/${userId}`)
      .then(response => {
        return response.data
      })
  },

  getStatus(userId: number) {
    return instanceAxios.get(`/profile/status/${userId}`)
  },

  setStatus(status: string) {
    return instanceAxios.put<ISetStatus>('profile/status', {status: status})
      .then(response => {
        return response.data
      })
  },
  setPhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instanceAxios.put<ISetPhoto>('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  setUserProfile(userData: any) {
    return instanceAxios.put<ISetUserProfile>('profile', userData)
  }
}


interface IAuthUser{
  data: {
    id: number,
    email: string,
    login: string
  }
  resultCode: ResultCodesEnum | ResultCaptchaIsRequired,
  messages: Array<string>
}
interface ILoginUser extends IResponseAPI {
  data: {
    userId: number
  }
}
interface ILogoutUser extends IResponseAPI {}

export const authAPI = {
  authUser() {
    return instanceAxios.get<IAuthUser>('auth/me')
      .then(response => {
        return response.data
      })
  },
  loginUser(email: string, password: string, rememberMe: boolean, captcha: string | null) {
    return instanceAxios.post<ILoginUser>('auth/login', {email, password, rememberMe, captcha})
      .then(response => {
        return response.data
      })
  },
  logoutUser() {
    return instanceAxios.delete<ILogoutUser>('auth/login')
      .then(response => {
        return response.data
      })
  }
}


interface IGetCaptchaURL extends IResponseAPI {
  url: string
}
export const securityAPI = {
  getCaptchaURL() {
    return instanceAxios.get<IGetCaptchaURL>('security/get-captcha-url')
  }
}