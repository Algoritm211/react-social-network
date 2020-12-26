import {Ifollow, IGetUsers, instanceAxios, IResponseAPI, Iunfollow} from "./api";


export const usersAPI = {
  getUsers(currentPage: number, usersPerPage: number) {
    return instanceAxios.get<IGetUsers>(`users?page=${currentPage}&count=${usersPerPage}`)
      .then(response => {
        return response.data
      })
  },

  follow: async (userId: number) => {
    return await instanceAxios.post<IResponseAPI>(`follow/${userId}`)
      .then(response => {
        return response.data
      })
  },

  unfollow: async (userId: number) => {
    return await instanceAxios.delete<Iunfollow>(`follow/${userId}`)
      .then(response => {
        return response.data
      })
  }
}