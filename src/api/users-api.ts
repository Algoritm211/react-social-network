import {IGetUsers, instanceAxios, IResponseAPI, Iunfollow} from "./api";


export const usersAPI = {
  async getUsers(currentPage: number, usersPerPage: number, term: string = '', friend: null | boolean) {
    let friendToUrl: string
    if (friend !== null) {
      friendToUrl = friend.toString()
    } else {
      friendToUrl = ''
    }
    return await instanceAxios.get<IGetUsers>(`users?page=${currentPage}&count=${usersPerPage}&term=${term}&friend=${friendToUrl}`)
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