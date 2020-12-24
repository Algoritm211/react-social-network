import {IAuthUser, ILoginUser, ILogoutUser, instanceAxios} from "./api";

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