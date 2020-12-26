import usersReducer, {actions, UsersReducerStateType} from "./users-reducer";


let state: UsersReducerStateType

beforeEach(() => {
  state =  {
    users: [
      {id: 1, name: 'Alex 0', followed: false, photos: {small: null, large: null}, status: 'status 1'},
      {id: 2, name: 'Alex 1', followed: false, photos: {small: null, large: null}, status: 'status 1'},
      {id: 3, name: 'Alex 2', followed: true, photos: {small: null, large: null}, status: 'status 2'},
      {id: 4, name: 'Alex 3', followed: false, photos: {small: null, large: null}, status: 'status 3'}
    ],
    usersPerPage: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    toggleFollowing: []
  }
})

test('test followSuccess action', () => {

  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeTruthy()
  expect(newState.users[1].followed).toBeFalsy()

})

test('test unfollowSuccess action', () => {

  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[2].followed).toBeFalsy()

})