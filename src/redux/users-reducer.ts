import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../components/utils/helpers/helpers";
import {PhotosType, UsersType} from "../types/types";

const FOLLOW = "social-network-react/usersPage/FOLLOW";
const UNFOLLOW = "social-network-react/usersPage/UNFOLLOW";
const SET_USERS = "social-network-react/usersPage/SET_USERS";
const SET_CURRENT_PAGE = 'social-network-react/usersPage/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'social-network-react/usersPage/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social-network-react/usersPage/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'social-network-react/usersPage/TOGGLE_IS_FOLLOWING'


type UsersReducerStateType = {
  users: Array<UsersType>,
  usersPerPage: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean,
  toggleFollowing: Array<number> // array of user ids
}

const initialState: UsersReducerStateType = {
  users: [],
  usersPerPage: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  toggleFollowing: []
};

const usersReducer = (state = initialState, action: any): UsersReducerStateType => {
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
        toggleFollowing: action.isToggleFollowing
                        ? [...state.toggleFollowing, action.userId]
                        : [...state.toggleFollowing.filter(id => id !== action.userId)]
      }
    default:
      return state;
  }
};


type FollowSuccessType = {
  type: typeof FOLLOW,
  userId: number,
}
export const followSuccess = (userId: number): FollowSuccessType => {
  return {
    type: FOLLOW,
    userId: userId,
  };
};

type UnfollowSuccessType = {
  type: typeof UNFOLLOW,
  userId: number,
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};

type SetUsersACType = {
  type: typeof SET_USERS,
  users: Array<UsersType>,
}
export const setUsersAC = (users: Array<any>): SetUsersACType => {
  return {
    type: SET_USERS,
    users: users,
  };
};

type SetTotalUsersCountACType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  usersCount: number

}

export const setTotalUsersCountAC = (count: number): SetTotalUsersCountACType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    usersCount: count
  }
}


type SetCurrentPageACType = {
  type: typeof SET_CURRENT_PAGE,
  page: number
}
export const setCurrentPageAC = (page: number): SetCurrentPageACType => {
  return {
    type: SET_CURRENT_PAGE,
    page: page
  }
}

type ToggleIsFetchingACType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingACType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
  }
}

type ToggleIsFollowingACType = {
  type: typeof TOGGLE_IS_FOLLOWING,
  isToggleFollowing: boolean,
  userId: number
}
export const toggleIsFollowingAC = (isToglleFollowing: boolean, userId: number): ToggleIsFollowingACType => {
  return {
    type: TOGGLE_IS_FOLLOWING,
    isToggleFollowing: isToglleFollowing,
    userId: userId
  }
}

export const requestUsers = (currentPage: number, usersPerPage: number) => {
  return async (dispatch: Function) => {
    dispatch(toggleIsFetchingAC(true))
    const data = await usersAPI.getUsers(currentPage, usersPerPage)
      
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAC(data.items))
    dispatch(setTotalUsersCountAC(data.totalCount - 7899))
  }
}

export const follow = (userId: number) => {
  return async (dispatch: Function) => {
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

export const unfollow = (userId: number) => {
  return async (dispatch: Function) => {
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
