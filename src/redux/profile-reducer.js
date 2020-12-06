import { profileAPI } from "../api/api"

const ADD_POST = 'social-network-react/profilePage/ADD-POST'
const SET_USER_PROFILE = 'social-network-react/profilePage/SET_USER_PROFILE'
const SET_USER_STATUS = 'social-network-react/profilePage/SET_USER_STATUS'
const DELETE_POST = 'social-network-react/profilePage/DELETE_POST'

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

export const getProfile = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(data))
  }
}

export const setStatusAC = (status) => {
  return {
    type: SET_USER_STATUS,
    status: status
  }
}

export const getStatus = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(data.data))
  }
}

export const updateStatus = (status) => {
  return async (dispatch) => {
    let data = await profileAPI.setStatus(status)
    if (data.resultCode === 0) {
      dispatch(setStatusAC(status))
    }
  }
}




export default profileReducer