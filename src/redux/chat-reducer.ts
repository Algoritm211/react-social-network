import {ChatAPI, MessageType, StatusType } from "../api/chat-api"
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {Dispatch} from "redux";
import {message} from "antd";

const SET_MESSAGES = 'social-network-react/chatPage/SET_MESSAGES'
const CHANGE_STATUS = 'social-network-react/chatPage/CHANGE_STATUS'

type initialChatState = {
  messages: Array<MessageType>
  status: StatusType
}

const initialState: initialChatState = {
  messages: [],
  status: "pending",
}

export const chatReducer = (state: initialChatState = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.messages]
      }
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.status
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
  },
  setStatus: (status: StatusType) => {
    return {
      type: CHANGE_STATUS,
      status: status
    } as const
  }
}


let _messageHandler: ((message: Array<MessageType>) => void) | null = null

const messageHandlerCreator = (dispatch: Dispatch) => {
  if (_messageHandler === null) {
    _messageHandler = (messages: Array<MessageType>) => {
      dispatch(actions.setMessages(messages))
    }
  }

  return _messageHandler
}

let _changeStatusHandler: ((status: StatusType) => void) | null = null

const changeStatusHandlerCreator = (dispatch: Dispatch) => {
  if (_changeStatusHandler === null) {
    _changeStatusHandler = (status) => {
      dispatch(actions.setStatus(status))
    }
  }

  return _changeStatusHandler
}

export const startMessageListening = (): ThunkType => async (dispatch) => {
  ChatAPI.start()
  ChatAPI.subscribe('messages-consumers', messageHandlerCreator(dispatch))
  ChatAPI.subscribe('status-changers', changeStatusHandlerCreator(dispatch))
}


export const stopMessageListening = (): ThunkType => async (dispatch) => {
  ChatAPI.unsubscribe('messages-consumers',messageHandlerCreator(dispatch))
  ChatAPI.unsubscribe('status-changers', changeStatusHandlerCreator(dispatch))
  ChatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  ChatAPI.sendMessage(message)
}

type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
