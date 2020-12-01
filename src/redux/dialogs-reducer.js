
const SEND_MESSAGE = 'SEND-MESSAGE'

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
}

const dialogsReducer = (state = initialState, action) => {

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




export const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    newMessageText: message
  }
}

export default dialogsReducer