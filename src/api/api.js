import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '91cc5a84-d625-478b-a406-09acdffa3140'
  }
})

export const usersAPI = {
  getUsers(currentPage, usersPerPage) {
    return instanceAxios.get(`users?page=${currentPage}&count=${usersPerPage}`)
              .then(response => {
                return response.data
              })
  },

  follow(userId) {
    return instanceAxios.post(`follow/${userId}`)
        .then(response => {
          return response.data
        })
  },

  unfollow(userId) {
    return instanceAxios.delete(`follow/${userId}`)
          .then(response => {
            return response.data
          })
  }
}

export const profileAPI = {
  getProfile(userId) {
    return instanceAxios.get(`profile/${userId}`)
      .then(response => {
        return response.data
      })
  },

  getStatus(userId) {
    return instanceAxios.get(`/profile/status/${userId}`)
  },

  setStatus(status) {
    return instanceAxios.put('profile/status', {status: status})
      .then(response => {
        return response.data
      })
  }
}

export const authAPI = {
  authUser() {
    return instanceAxios.get('auth/me')
      .then(response => {
        return response.data
      })
  },
  loginUser(email, password, rememberMe) {
    return instanceAxios.post('auth/login', {email, password, rememberMe})
      .then(response => {
        return response.data
      })
  },
  logoutUser() {
    return instanceAxios.delete('auth/login')
      .then(response => {
        return response.data
      })
  }
}