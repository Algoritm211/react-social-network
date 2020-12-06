import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../components/utils/helpers/helpers";

const FOLLOW = "social-network-react/usersPage/FOLLOW";
const UNFOLLOW = "social-network-react/usersPage/UNFOLLOW";
const SET_USERS = "social-network-react/usersPage/SET_USERS";
const SET_CURRENT_PAGE = 'social-network-react/usersPage/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'social-network-react/usersPage/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social-network-react/usersPage/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'social-network-react/usersPage/TOGGLE_IS_FOLLOWING'

const initialState = {
  users: [],
  usersPerPage: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  toggleFollowing: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, 'id', action.userId, {followed: true})
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, 'id', action.userId, {followed: false})
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.usersCount
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page
      }

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    case TOGGLE_IS_FOLLOWING:
      return {
        ...state,
        toggleFollowing: action.isToglleFollowing 
                        ? [...state.toggleFollowing, action.userId]
                        : [...state.toggleFollowing.filter(id => id !== action.userId)]
      }
    default:
      return state;
  }
};

export const followSuccess = (userId) => {
  return {
    type: FOLLOW,
    userId: userId,
  };
};

export const unfollowSuccess = (userId) => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};

export const setUsersAC = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};

export const setTotalUsersCountAC = (count) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    usersCount: count
  }
}

export const setCurrentPageAC = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    page: page
  }
}

export const toggleIsFetchingAC = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
  }
}

export const toggleIsFollowingAC = (isToglleFollowing, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING,
    isToglleFollowing: isToglleFollowing,
    userId: userId
  }
}

export const requestUsers = (currentPage, usersPerPage) => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    const data = await usersAPI.getUsers(currentPage, usersPerPage)
      
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAC(data.items))
    dispatch(setTotalUsersCountAC(data.totalCount - 7899))
  }
}

export const follow = (userId) => {
  return async (dispatch) => {
    dispatch(toggleIsFollowingAC(true, userId))
    const data = await usersAPI.follow(userId)
    try {
      if (data.resultCode === 0) {
        dispatch(followSuccess(userId))
      }
      dispatch(toggleIsFollowingAC(false, userId))
      
    } catch (error) {
      dispatch(toggleIsFollowingAC(false, userId))
    }
  }
}

export const unfollow = (userId) => {
  return async (dispatch) => {
    dispatch(toggleIsFollowingAC(true, userId))
    const data = await usersAPI.unfollow(userId)

    try {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
      }
      dispatch(toggleIsFollowingAC(false, userId))
    } catch (error) {
      throw new Error(error)
    }
  }
}



export default usersReducer;
