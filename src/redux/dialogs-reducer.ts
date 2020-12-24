import {InferActionTypes} from "./redux-store";

const SEND_MESSAGE = 'social-network-react/dialogsPage/SEND-MESSAGE'

export type DialogsDataType = {
  id: number,
  name: string
}

export type MessagesDataType = {
  id: number,
  message: string
}

const initialState = {
  dialogsData: [
    { id: 1, name: "Alexey" },
    { id: 2, name: "Alex" },
    { id: 3, name: "Sabr" },
    { id: 4, name: "Edward" },
  ] as Array<DialogsDataType>,
  messagesData: [
    { id: 1, message: "Hi, how are you" },
    { id: 2, message: "Hello, do you want to drink coffee with me?" },
  ] as Array<MessagesDataType>,
}

export type DialogsReducerType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionTypes): DialogsReducerType => {

  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
          id: Date.now(),
          message: action.newMessageText,
        }
      // let newMessage = {
      //   id: Date.now(),
      //   message: state.newMessageText,
      // }
      return {
        ...state,
        messagesData:[
          ...state.messagesData,
          newMessage
        ],
      }
    default:
      return state
  }
}



export const actions = {
  sendMessage: (message: string) => {
    return {
      type: SEND_MESSAGE,
      newMessageText: message
    } as const
  }

}

type ActionTypes = InferActionTypes<typeof actions>

export default dialogsReducer