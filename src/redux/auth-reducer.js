import {stopSubmit} from "redux-form"
import {authAPI, securityAPI} from "../api/api"

const SET_USER_DATA = 'social-network-react/auth/SET_USER_DATA'
const GET_AUTH_USER_DATA = 'social-network-react/auth/GET_AUTH_USER_DATA'
const SET_CAPTCHA_URL = 'social-network-react/auth/SET_CAPTCHA_URL'


const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captcha: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      }
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captcha: action.captcha
      }
    case GET_AUTH_USER_DATA:
      return state
    default:
      return state
  }
}

export const getAuthUserData = () => {
  return {
    type: GET_AUTH_USER_DATA,
  }
}

const setCaptcha = (captcha) => {
  return {
    type: SET_CAPTCHA_URL,
    captcha: captcha
  }
}

export const setAuthUserDataAC = (userId, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    data: {
      userId,
      email,
      login,
      isAuth,
    }
  }
}

export const setAuthUserData = () => {
  return async (dispatch) => {
    const data = await authAPI.authUser()
    if (data.resultCode === 0) {
      let {id, email, login} = data.data
      dispatch(setAuthUserDataAC(id, email, login, true))
    }
  }
}

export const loginUser = (email, password, rememberMe, captcha = null) => { //formData - object
  return async (dispatch) => {
    let data = await authAPI.loginUser(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
      dispatch(setAuthUserData())
    } else {
      if (data.resultCode === 10) {
        const captcha = await securityAPI.getCaptchaURL()
        dispatch(setCaptcha(captcha.data.url))
      }
      const messageError = data.messages[0] || 'An error occured'
      const action = stopSubmit('login', {_error: messageError})
      dispatch(action)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    let data = await authAPI.logoutUser()
    if (data.resultCode === 0) {
      dispatch(setAuthUserDataAC(null, null, null, false))
    }

  }
}

export default authReducer