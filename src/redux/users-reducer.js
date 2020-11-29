import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'

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
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
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

export const getUsers = (currentPage, usersPerPage) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, usersPerPage)
      .then(data => {
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount - 7899))
      })
  }
}

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingAC(true, userId))
    usersAPI.follow(userId)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(followSuccess(userId))
        }
        dispatch(toggleIsFollowingAC(false, userId))
      })
      .catch(() => {
        dispatch(toggleIsFollowingAC(false, userId))
      })
  }
}

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingAC(true, userId))
    usersAPI.unfollow(userId)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleIsFollowingAC(false, userId))
      })
      .catch((e) => {
        throw new Error(e)
        // dispatch(toggleIsFollowingAC(false, userId))
      })
  }
}



export default usersReducer;
