import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_ID = 'SET_USER_ID'

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

export const setAuthUserData = () => {
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

export const loginUser = (formData) => { //formData - object
  return (dispatch) => {
    authAPI.loginUser(formData)
      .then(data => {
        if (data.resultCode === 0) {
          console.log(data);
          console.log('success');
        }
      })
  }
}

export default authReducer