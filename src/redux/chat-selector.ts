import {AppStateType} from "./redux-store";


export const getChatMessages = (state: AppStateType) => {
  return state.chat.messages
}