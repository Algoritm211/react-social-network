
const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const initialState = {
  dialogsData: [
    { id: 1, name: "Alexey" },
    { id: 2, name: "Alex" },
    { id: 3, name: "Sabr" },
    { id: 4, name: "Edward" },
  ],
  messagesData: [
    { id: 1, message: "Hi, how are you" },
    { id: 2, message: "Hello, do you want to drink coffee with me?" },
  ],
  newMessageText: 'New message'
}

const dialogsReducer = (state = initialState, action) => {

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