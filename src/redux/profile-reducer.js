import { profileAPI } from "../api/api"
import {stopSubmit} from "redux-form";
import {getErrorField} from "../components/utils/helpers/helpers";

const ADD_POST = 'social-network-react/profilePage/ADD-POST'
const SET_USER_PROFILE = 'social-network-react/profilePage/SET_USER_PROFILE'
const SET_USER_STATUS = 'social-network-react/profilePage/SET_USER_STATUS'
const SET_UPDATE_STATUS_ERROR = 'social-network-react/profilePage/SET_UPDATE_STATUS_ERROR'
const DELETE_POST = 'social-network-react/profilePage/DELETE_POST'
const SET_USER_PROFILE_PHOTO = 'social-network-react/profilePage/SET_USER_PROFILE_PHOTO'

const initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you", likesCount: 12 },
    { id: 2, message: "it`s my first post", likesCount: 15 },
  ],
  profile: null,
  statusField: {
    status: '',
    errorMessage: null
  }
}

const profileReducer = (state = initialState, action) => {

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
        ]
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
        profile: {...state.profile, photos: action.photosObj}
      }
    default:
      return state
  }
}

export const addPostActionCreator = (post) => {
  return {
    type: ADD_POST,
    newPostText: post
  }
}

export const deletePostAC = (postId) => {
  return {
    type: DELETE_POST,
    postId: postId
  }
}

export const setUserProfileAC = (profile) => {
  return { 
    type: SET_USER_PROFILE,
    profile: profile
  }
}

export const setUserPhotoSuccess = (photosObj) => {
  return {
    type: SET_USER_PROFILE_PHOTO,
    photosObj: photosObj
  }
}

export const setUserPhoto = (photoFile) => {
  return async (dispatch) => {
    let data = await profileAPI.setPhoto(photoFile)
    if (data.data.resultCode === 0) {
      dispatch(setUserPhotoSuccess(data.data.data.photos))
    }
  }
}

export const getProfile = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(data))
  }
}

const setStatusSuccess = (status) => {
  return {
    type: SET_USER_STATUS,
    status: status
  }
}

export const getStatus = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatusSuccess(data.data))
  }
}

const setStatusError = (error) => {
  return {
    type: SET_UPDATE_STATUS_ERROR,
    error: error
  }
}

export const updateStatus = (status) => {
  return async (dispatch) => {
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

export const updateProfile = (userData) => {

  return async (dispatch, getState) => {
    const result = await profileAPI.setUserProfile(userData)
    if (result.data.resultCode === 0) {
      const userId = getState().auth.userId
      dispatch(getProfile(userId))
    } else {
      const messageError = result.data.messages[0] || 'An error occured'
      const errorField = getErrorField(messageError)
      if (errorField === 'formError') {
        const action = stopSubmit('editProfileForm', {_error: messageError})
        dispatch(action)
        return Promise.reject()
      } else {
        const action = stopSubmit('editProfileForm', {
         contacts : {
           [errorField]: messageError
         }
        })
        dispatch(action)
        return Promise.reject()
      }
    }
  }
}


export default profileReducer