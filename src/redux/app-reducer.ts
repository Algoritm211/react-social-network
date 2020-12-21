import { setAuthUserData } from "./auth-reducer"

const INITIALIZE_SUCCESS = 'social-network-react/app/INITIALIZE_SUCCESS'

export type AppReducerStateType = {
  initialized: boolean
}

const initialState: AppReducerStateType = {
  initialized: false
}


const appReducer = (state = initialState, action: any): AppReducerStateType => {
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

/* type of actions*/
type initializeAppSuccessType = {
  type: typeof INITIALIZE_SUCCESS
}
/*end of type actions*/

const initializeAppSuccess = (): initializeAppSuccessType => {
  return {
    type: INITIALIZE_SUCCESS,
  }
}

export const initializeApp = () => {
  return (dispatch: Function) => {
    const promiseSetAuthData = dispatch(setAuthUserData())
    Promise.all([promiseSetAuthData])
      .then(() => {
        dispatch(initializeAppSuccess())
      })
  }
}

export default appReducer