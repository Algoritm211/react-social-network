import {ChatAPI, MessageType } from "../api/chat-api"
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {Dispatch} from "redux";
import {message} from "antd";

const SET_MESSAGES = 'social-network-react/chatPage/SET_MESSAGES'

type initialChatState = {
  messages: Array<MessageType>
}

const initialState: initialChatState = {
  messages: []
}

export const chatReducer = (state: initialChatState = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.messages]
      }
    default:
      return state
  }
}




export const actions = {
  setMessages: (messages: Array<MessageType>) => {
    return {
      type: SET_MESSAGES,
      messages: messages
    } as const
  }
}


let _messageHandler: ((messages: Array<MessageType>) => void) | null = null

const messageHandlerCreator = (dispatch: Dispatch) => {
  if (_messageHandler === null) {
    _messageHandler = (messages: Array<MessageType>) => {
      dispatch(actions.setMessages(messages))
    }
  }

  return _messageHandler
}

export const startMessageListening = (): ThunkType => async (dispatch) => {
  ChatAPI.start()
  ChatAPI.subscribe(messageHandlerCreator(dispatch))
}


export const stopMessageListening = (): ThunkType => async (dispatch) => {
  ChatAPI.unsubscribe(messageHandlerCreator(dispatch))
  ChatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  ChatAPI.sendMessage(message)
}




type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>