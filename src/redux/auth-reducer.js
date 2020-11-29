import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    default:
      return state
  }
}

export const setAuthUserDataAC = (userId, email, login) => {
  return {
    type: SET_USER_DATA,
    data: {
      userId, 
      email, 
      login
    }
  }
}

export const setAuthUserData = (userId, email, login) => {
  return (dispatch) => {
    authAPI.authUser()
      .then(data => {
        if (data.resultCode === 0) {
          let {id, email, login} = data.data
          dispatch(setAuthUserDataAC(id, email, login))
        }
      })
  }
}

export default authReducer