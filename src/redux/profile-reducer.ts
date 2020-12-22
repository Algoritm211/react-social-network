import { profileAPI } from "../api/api"
import {FormAction, stopSubmit} from "redux-form";
import {getErrorField} from "../components/utils/helpers/helpers";
import {PhotosType, PostType, ProfileType, StatusType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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


/* type of actions*/
type AddPostActionCreatorType = {
  type: typeof ADD_POST,
  newPostText: string
}

type DeletePostACType = {
  type: typeof DELETE_POST,
  postId: number
}

type SetUserProfileACType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}

type SetUserPhotoSuccessType = {
  type: typeof SET_USER_PROFILE_PHOTO,
  photosObj: PhotosType
}

type SetStatusSuccessType = {
  type: typeof SET_USER_STATUS,
  status: string
}

type SetStatusErrorType = {
  type: typeof SET_UPDATE_STATUS_ERROR,
  error: string
}

type ActionsTypes = AddPostActionCreatorType | DeletePostACType |
              SetUserProfileACType | SetUserPhotoSuccessType  |
                SetStatusSuccessType | SetStatusErrorType
/*end of type actions*/

export const addPostActionCreator = (post: string): AddPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPostText: post
  }
}

export const deletePostAC = (postId: number): DeletePostACType => {
  return {
    type: DELETE_POST,
    postId: postId
  }
}

export const setUserProfileAC = (profile: ProfileType): SetUserProfileACType => {
  return { 
    type: SET_USER_PROFILE,
    profile: profile
  }
}

export const setUserPhotoSuccess = (photosObj: PhotosType): SetUserPhotoSuccessType => {
  return {
    type: SET_USER_PROFILE_PHOTO,
    photosObj: photosObj
  }
}

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setUserPhoto = (photoFile: File): ThunkActionType => {
  return async (dispatch) => {
    let data = await profileAPI.setPhoto(photoFile)
    if (data.data.resultCode === 0) {
      dispatch(setUserPhotoSuccess(data.data.data.photos))
    }
  }
}

export const getProfile = (userId: number): ThunkActionType => {
  return async (dispatch: Function) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(data))
  }
}

const setStatusSuccess = (status: string): SetStatusSuccessType => {
  return {
    type: SET_USER_STATUS,
    status: status
  }
}

export const getStatus = (userId: number): ThunkActionType => {
  return async (dispatch: Function) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatusSuccess(data.data))
  }
}

const setStatusError = (error: string): SetStatusErrorType   => {
  return {
    type: SET_UPDATE_STATUS_ERROR,
    error: error
  }
}

export const updateStatus = (status: string): ThunkActionType => {
  return async (dispatch: Function) => {
    try {
      let data = await profileAPI.setStatus(status)
      if (data.resultCode === 0) {
        dispatch(setStatusSuccess(status))
      } else {
        const error = data.messages[0]
        dispatch(setStatusError(error))
      }
    } catch (e) {
      dispatch(setStatusError('Some error occurred. Try again later'))
    }
  }
}

export const updateProfile = (userData: any): ThunkAction<Promise<any>, AppStateType, unknown, ActionsTypes> => {

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


export default profileReducer