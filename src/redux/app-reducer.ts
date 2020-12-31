import {setAuthUserData} from "./auth-reducer"
import {BaseThunkType, InferActionTypes} from "./redux-store"

const INITIALIZE_SUCCESS = 'social-network-react/app/INITIALIZE_SUCCESS'

export type AppReducerStateType = {
  initialized: boolean
}

const initialState: AppReducerStateType = {
  initialized: false
}


const appReducer = (state = initialState, action: ActionsTypes): AppReducerStateType => {
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



export const actions = {
  initializeAppSuccess: () => {
    return {
      type: INITIALIZE_SUCCESS,
    } as const
  }
}


export const initializeApp = (): ThunkType => {
  return async (dispatch) => {
    const promiseSetAuthData = dispatch(setAuthUserData())
    Promise.all([promiseSetAuthData])
      .then(() => {
        dispatch(actions.initializeAppSuccess())
      })
  }
}

type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default appReducer