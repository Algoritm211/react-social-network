
const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const dialogsReducer = (state, action) => {

  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
        id: Date.now(),
        message: state.newMessageText,
      }
      // console.log(state);
      state.messagesData.push(newMessage)
      state.newMessageText = ''
      return state
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.messageText
      return state
    default:
      return state
  }
}


export const sendMessageActionCreator = () => {
  return {
    type: SEND_MESSAGE
  }
}

export const updateNewMessageTextActionCreator = (messageText) => {
  return {
    type: UPDATE_NEW_MESSAGE_TEXT,
    messageText: messageText
  }
}

export default dialogsReducer