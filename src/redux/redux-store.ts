import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'
import {chatReducer} from "./chat-reducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
  chat: chatReducer
})

type RootReducerType = typeof rootReducer // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

// const d = {
//   c: (message: string) => {
//     return {
//       type: 'sadfsdf',
//       newMessageText: 'asdasd'
//     } as const
//   },
// }
//
// type asdsdf = ReturnType<PropertiesTypes<typeof d>>

// const obj = {
//   a: {name: 'Alex', age: 19},
//   b: {name: 'S', numberOfCars: 20}
// }
//
// let m: PropertiesTypes<typeof obj>

export type InferActionTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));

// as ThunkMiddleware<AppStateType, ActionTypes>
// let store = createStore(reducers, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.__store__ = store

export default store