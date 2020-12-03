import { stopSubmit } from "redux-form"
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
      }
    default:
      return state
  }
}

export const setAuthUserDataAC = (userId, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    data: {
      userId, 
      email, 
      login,
      isAuth
    }
  }
}

export const setAuthUserData = () => {
  return (dispatch) => {
    return authAPI.authUser()
      .then(data => {
        if (data.resultCode === 0) {
          let {id, email, login} = data.data
          dispatch(setAuthUserDataAC(id, email, login, true))
        }
      })
  }
}

export const loginUser = (email, password, rememberMe) => { //formData - object
  return (dispatch) => {
    authAPI.loginUser(email, password, rememberMe)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setAuthUserData())
        } else {
          const messageError = data.messages[0] || 'An error occured'
          const action = stopSubmit('login', {_error: messageError}) 
          dispatch(action)
        }
      })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    authAPI.logoutUser()
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setAuthUserDataAC(null, null, null, false))
        }
      })
  }
}

export default authReducer