
import {stopSubmit} from "redux-form"
import {AppStateType, BaseThunkType, InferActionTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const SET_USER_DATA = 'social-network-react/auth/SET_USER_DATA'
const GET_AUTH_USER_DATA = 'social-network-react/auth/GET_AUTH_USER_DATA'
const SET_CAPTCHA_URL = 'social-network-react/auth/SET_CAPTCHA_URL'

type AuthReducerState = {
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  captcha: string | null,
}

const initialState: AuthReducerState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captcha: null
}

const authReducer = (state = initialState, action: ActionTypes): AuthReducerState => {
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

/* types of actions */
/* end of types actions */


export const actions = {
  getAuthUserData: () => {
    return {
      type: GET_AUTH_USER_DATA,
    } as const
  },

  setAuthUserDataAC: (userId: number | null,
                       email: string | null,
                       login: string | null,
                       isAuth: boolean)  => {
    return {
      type: SET_USER_DATA,
      data: {
        userId,
        email,
        login,
        isAuth,
      }
    } as const
  },
  setCaptcha: (captcha: string) => {
    return {
      type: SET_CAPTCHA_URL,
      captcha: captcha
    } as const
  }


}

type ThunkActionType = BaseThunkType<ActionTypes>

export const setAuthUserData = (): ThunkActionType => {
  return async (dispatch: Function) => {
    const data = await authAPI.authUser()
    if (data.resultCode === 0) {
      let {id, email, login} = data.data
      dispatch(actions.setAuthUserDataAC(id, email, login, true))
    }
  }
}

export const loginUser = (email: string,
                          password: string,
                          rememberMe: boolean,
                          captcha: string | null): ThunkActionType => { //formData - object

  return async (dispatch: Function) => {
    let data = await authAPI.loginUser(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
      dispatch(setAuthUserData())
    } else {
      if (data.resultCode === 10) {
        const captcha = await securityAPI.getCaptchaURL()
        dispatch(actions.setCaptcha(captcha.data.url))
      }
      const messageError = data.messages[0] || 'An error occured'
      const action = stopSubmit('login', {_error: messageError})
      dispatch(action)
    }
  }
}

export const logoutUser = (): ThunkActionType => {
  return async (dispatch: Function) => {
    let data = await authAPI.logoutUser()
    if (data.resultCode === 0) {
      dispatch(actions.setAuthUserDataAC(null, null, null, false))
    }

  }
}


type ActionTypes = InferActionTypes<typeof actions>
export default authReducer