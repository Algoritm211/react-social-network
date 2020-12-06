import authReducer, {setAuthUserDataAC } from "./auth-reducer"


const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}

it('Set auth user data', () => {
  const action = setAuthUserDataAC(1, 'algoritm211@gmail.com', 'Alexey_Horbunov', true)
  const newState = authReducer(initialState, action)

  expect(newState.userId).toEqual(1)
  expect(newState.email).toEqual('algoritm211@gmail.com')
  expect(newState.login).toEqual('Alexey_Horbunov')
  expect(newState.isAuth).toEqual(true)
})

