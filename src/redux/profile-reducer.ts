import {FormAction, stopSubmit} from "redux-form";
import {getErrorField} from "../components/utils/helpers/helpers";
import {PhotosType, PostType, ProfileType, StatusType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";

const ADD_POST = 'social-network-react/profilePage/ADD-POST'
const SET_USER_PROFILE = 'social-network-react/profilePage/SET_USER_PROFILE'
const SET_USER_STATUS = 'social-network-react/profilePage/SET_USER_STATUS'
const SET_UPDATE_STATUS_ERROR = 'social-network-react/profilePage/SET_UPDATE_STATUS_ERROR'
const DELETE_POST = 'social-network-react/profilePage/DELETE_POST'
const SET_USER_PROFILE_PHOTO = 'social-network-react/profilePage/SET_USER_PROFILE_PHOTO'


// type ProfileInitialStateType = {
//   postsData: Array<PostType>,
//   profile: ProfileType,
//   statusField: StatusType
// }

let initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you", likesCount: 12 },
    { id: 2, message: "it`s my first post", likesCount: 15 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  statusField: {
    status: '',
    errorMessage: null
  } as StatusType
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: Date.now(),
        message: action.newPostText,
        likesCount: 0
      }
      // console.log(state);
      
      return {
        ...state,
        postsData: [
          ...state.postsData,
          newPost
        ],
      }
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(post=> post.id !== action.postId)
      }
    case SET_USER_PROFILE: 
      return {
        ...state,
        profile: action.profile
      }
    case SET_USER_STATUS:
      return {
        ...state,
        statusField: {...state.statusField, status: action.status, errorMessage: null}
      }
    case SET_UPDATE_STATUS_ERROR:
      return {
        ...state,
        statusField: {...state.statusField, errorMessage: action.error}
      }
    case SET_USER_PROFILE_PHOTO:
      return {
        ...state,
        profile: {...state.profile, photos: action.photosObj} as ProfileType
      }
    default:
      return state
  }
}




export const actions = {
  addPostActionCreator: (post: string) => {
    return {
      type: ADD_POST,
      newPostText: post
    } as const
  },
  deletePostAC: (postId: number) => {
    return {
      type: DELETE_POST,
      postId: postId
    } as const
  },
  setUserProfileAC: (profile: ProfileType) => {
    return {
      type: SET_USER_PROFILE,
      profile: profile
    } as const
  },
  setUserPhotoSuccess: (photosObj: PhotosType) => {
    return {
      type: SET_USER_PROFILE_PHOTO,
      photosObj: photosObj
    } as const
  },
  setStatusSuccess: (status: string) => {
    return {
      type: SET_USER_STATUS,
      status: status
    } as const
  },
  setStatusError: (error: string) => {
    return {
      type: SET_UPDATE_STATUS_ERROR,
      error: error
    } as const
  }

}


export const setUserPhoto = (photoFile: File): ThunkActionType => {
  return async (dispatch) => {
    let data = await profileAPI.setPhoto(photoFile)
    if (data.data.resultCode === 0) {
      dispatch(actions.setUserPhotoSuccess(data.data.data.photos))
    }
  }
}

export const getProfile = (userId: number): ThunkActionType => {
  return async (dispatch: Function) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfileAC(data))
  }
}



export const getStatus = (userId: number): ThunkActionType => {
  return async (dispatch: Function) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatusSuccess(data.data))
  }
}


export const updateStatus = (status: string): ThunkActionType => {
  return async (dispatch: Function) => {
    try {
      let data = await profileAPI.setStatus(status)
      if (data.resultCode === 0) {
        dispatch(actions.setStatusSuccess(status))
      } else {
        const error = data.messages[0]
        dispatch(actions.setStatusError(error))
      }
    } catch (e) {
      dispatch(actions.setStatusError('Some error occurred. Try again later'))
    }
  }
}

export const updateProfile = (userData: any): ThunkAction<Promise<any>, AppStateType, unknown, ActionTypes> => {

  return async (dispatch , getState) => {
    const result = await profileAPI.setUserProfile(userData)
    if (result.data.resultCode === 0) {
      const userId = getState().auth.userId
      if (userId !== null) {
        dispatch(getProfile(userId))
      }
    } else {
      const messageError = result.data.messages[0] || 'An error occured'
      const errorField = getErrorField(messageError)
      if (errorField === 'formError') {
        const action = stopSubmit('editProfileForm', {_error: messageError})
        // @ts-ignore
        dispatch(action)
        return Promise.reject()
      } else {
        const action = stopSubmit('editProfileForm', {
         contacts : {
           [errorField]: messageError
         }
        })
        // @ts-ignore
        dispatch(action)
        return Promise.reject()
      }
    }
  }
}

type ThunkActionType = BaseThunkType<ActionTypes>
type ActionTypes = InferActionTypes<typeof actions>
export default profileReducer