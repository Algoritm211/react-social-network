import {Ifollow, IGetUsers, instanceAxios, Iunfollow} from "./api";


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