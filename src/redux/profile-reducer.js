import { profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'

const initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you", likesCount: 12 },
    { id: 2, message: "it`s my first post", likesCount: 15 },
  ],
  profile: null,
  status: ''
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
    case SET_USER_PROFILE: 
      return {
        ...state,
        profile: action.profile
      }
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
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

export const setUserProfileAC = (profile) => {
  return { 
    type: SET_USER_PROFILE,
    profile: profile
  }
}

export const getProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId)
      .then(data => {
        dispatch(setUserProfileAC(data))
      })
  }
}

export const setStatusAC = (status) => {
  return {
    type: SET_USER_STATUS,
    status: status
  }
}

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId)
      .then(data => {
        dispatch(setStatusAC(data.data))
      })
  }
}

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.setStatus(status)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setStatusAC(status))
        }
      })
  }
}




export default profileReducer