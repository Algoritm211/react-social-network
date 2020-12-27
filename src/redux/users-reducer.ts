import {ResultCodesEnum} from "../api/api";
import {updateObjectInArray} from "../components/utils/helpers/helpers";
import {PhotosType, UsersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";

const FOLLOW = "social-network-react/usersPage/FOLLOW";
const UNFOLLOW = "social-network-react/usersPage/UNFOLLOW";
const SET_USERS = "social-network-react/usersPage/SET_USERS";
const SET_CURRENT_PAGE = 'social-network-react/usersPage/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'social-network-react/usersPage/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social-network-react/usersPage/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'social-network-react/usersPage/TOGGLE_IS_FOLLOWING'
const SET_FILTER_PARAMETERS = 'social-network-react/usersPage/SET_FILTER_PARAMETERS'

export type FilterType = {
  term: string,
  friend: null | boolean
}

export type UsersReducerStateType = {
  users: Array<UsersType>,
  usersPerPage: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean,
  toggleFollowing: Array<number>, // array of user ids
  filter: FilterType
}

const initialState: UsersReducerStateType = {
  users: [],
  usersPerPage: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  toggleFollowing: [],
  filter: {
    term: '',
    friend: null
  }
};

export const usersReducer = (state = initialState, action: ActionsTypes): UsersReducerStateType => {
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
    case SET_FILTER_PARAMETERS:
      return {
        ...state,
        filter: {...action.filterParams}
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


export const actions = {
  followSuccess: (userId: number) => {
    return {
      type: FOLLOW,
      userId: userId,
    } as const;
  },

  unfollowSuccess: (userId: number) => {
    return {
      type: UNFOLLOW,
      userId: userId,
    } as const;
  },

  setUsersAC: (users: Array<any>) => {
    return {
      type: SET_USERS,
      users: users,
    } as const;
  },

  setTotalUsersCountAC: (count: number) => {
    return {
      type: SET_TOTAL_USERS_COUNT,
      usersCount: count
    } as const
  },

  setCurrentPageAC: (page: number) => {
    return {
      type: SET_CURRENT_PAGE,
      page: page
    } as const
  },

  setFilterParameters: (filterParams: FilterType) => {
    return {
      type: SET_FILTER_PARAMETERS,
      filterParams: filterParams
    } as const
  },

  toggleIsFetchingAC: (isFetching: boolean) => {
    return {
      type: TOGGLE_IS_FETCHING,
      isFetching: isFetching
    } as const
  },

  toggleIsFollowingAC: (isToglleFollowing: boolean, userId: number) => {
    return {
      type: TOGGLE_IS_FOLLOWING,
      isToggleFollowing: isToglleFollowing,
      userId: userId
    } as const
  }
}


export const requestUsers = (currentPage: number, usersPerPage: number, term: string, friend: null | boolean): ThunkActionType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetchingAC(true))
    const data = await usersAPI.getUsers(currentPage, usersPerPage, term, friend)
    dispatch(actions.setFilterParameters({term: term, friend: friend}))

    dispatch(actions.toggleIsFetchingAC(false))
    dispatch(actions.setUsersAC(data.items))
    dispatch(actions.setTotalUsersCountAC(data.totalCount))
  }
}

export const follow = (userId: number): ThunkActionType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingAC(true, userId))
    const data = await usersAPI.follow(userId)
    try {
      if (data.resultCode === 0) {
        dispatch(actions.followSuccess(userId))
      }
      dispatch(actions.toggleIsFollowingAC(false, userId))
    } catch (error) {
      dispatch(actions.toggleIsFollowingAC(false, userId))
    }
  }
}

export const unfollow = (userId: number): ThunkActionType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingAC(true, userId))
    const data = await usersAPI.unfollow(userId)

    try {
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.unfollowSuccess(userId))
      }
      dispatch(actions.toggleIsFollowingAC(false, userId))
    } catch (error) {
      throw new Error(error)
    }
  }
}


type ActionsTypes = InferActionTypes<typeof actions>
type ThunkActionType = BaseThunkType<ActionsTypes>
export default usersReducer;
