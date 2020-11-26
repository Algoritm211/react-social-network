const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
  users: [],
  usersPerPage: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false
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
    default:
      return state;
  }
};

export const followAC = (userId) => {
  return {
    type: FOLLOW,
    userId: userId,
  };
};

export const unfollowAC = (userId) => {
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

export default usersReducer;
