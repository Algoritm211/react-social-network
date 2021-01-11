import {InferActionTypes} from "./redux-store";
import {MessageType} from "../types/types";

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
    { id: 4, name: "Edward"},
  ] as Array<DialogsDataType>,
  messagesData: [
    { userId: 1, userName: "Alexey", photo: null, message: "Привет, как дела" },
    { userId: 2, userName: "Alex", photo: null, message: "Все норм" },
    { userId: 3, userName: "Sabr", photo: null, message: "Леша, привет" },
    { userId: 4, userName: "Edward", photo: null, message: "Я Эдик" },
  ] as Array<MessageType>,
}

export type DialogsReducerType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionTypes): DialogsReducerType => {

  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
          userId: Date.now(),
          message: action.newMessageText,
          userName: "Alexey",
        photo: null
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