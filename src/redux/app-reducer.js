import { setAuthUserData } from "./auth-reducer"

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS'


const initialState = {
  initialized: false
}


const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

const initializeAppSuccess = () => {
  return {
    type: INITIALIZE_SUCCESS
  }
}

export const initializeApp = () => {
  return (dispatch) => {
    const promiseSetAuthData = dispatch(setAuthUserData())
    Promise.all([promiseSetAuthData])
      .then(() => {
        dispatch(initializeAppSuccess())
      })
  }
}

export default appReducer