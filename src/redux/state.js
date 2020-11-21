// let rerenderEntireTree = () => {
//   console.log('State changed');
// }

// let state = {
//   profilePage: {
//     postsData: [
//       { id: 1, message: "Hi, how are you", likesCount: 12 },
//       { id: 2, message: "it`s my first post", likesCount: 15 },
//     ],
//     newPostText: 'Rolls-Royce'
//   },
//   dialogsPage: {
//     dialogsData: [
//       { id: 1, name: "Alexey" },
//       { id: 2, name: "Alex" },
//       { id: 3, name: "Sabr" },
//       { id: 4, name: "Edward" },
//     ],
//     messagesData: [
//       { id: 1, message: "Hi, how are you" },
//       { id: 2, message: "Hello, do you want to drink coffee with me?" },
//     ],
//   },
//   sidebar: {
//     friends: [
//       {id: 1, name: 'Alex', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
//       {id: 2, name: 'Edward', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
//     ]
//   }
// };


// window.state = state

// export const addPost = () => {
  // let newPost = {
  //   id: 5,
  //   message: state.profilePage.newPostText,
  //   likesCount: 0
  // };
//   state.profilePage.postsData.push(newPost)
//   state.profilePage.newPostText = ''
//   rerenderEntireTree()
// }

// export const updateNewPostText = (newText) => {
//   state.profilePage.newPostText = newText
//   rerenderEntireTree()
// }
// // observer - наблюдатель

// export const subscribe = (observer) => {
//   rerenderEntireTree = observer
// }

// //TODO - переделать в ООП стиле

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const store = {
  _subscribe: () => {
    console.log('Now we have not observer');
  },

  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: "Hi, how are you", likesCount: 12 },
        { id: 2, message: "it`s my first post", likesCount: 15 },
      ],
      newPostText: 'Rolls-Royce'
    },
    dialogsPage: {
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
    },
    sidebar: {
      friends: [
        {id: 1, name: 'Alex', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
        {id: 2, name: 'Edward', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
      ]
    }
  },

  subscribe(observer) {
    this._subscribe = observer
  },
  getState() {
    return this._state
  },


  // addPost: function() {
  //   let newPost = {
  //     id: Date.now(),
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 0
  //   }
  //   this._state.profilePage.postsData.push(newPost)
  //   this._state.profilePage.newPostText = ''
  //   this._subscribe()
  // },
  // updateNewPostText(newText) {
  //   this._state.profilePage.newPostText = newText
  //   this._subscribe()
  // },
  
  dispatch(action) {
    switch (action.type) {
      case ADD_POST:
        let newPost = {
          id: Date.now(),
          message: this._state.profilePage.newPostText,
          likesCount: 0
        }
        this._state.profilePage.postsData.push(newPost)
        this._state.profilePage.newPostText = ''
        this._subscribe()
        break;
      case UPDATE_NEW_POST_TEXT:
        this._state.profilePage.newPostText = action.newText
        this._subscribe()
        break;
      case SEND_MESSAGE:
        let newMessage = {
          id: Date.now(),
          message: this._state.dialogsPage.newMessageText,
        }
        this._state.dialogsPage.messagesData.push(newMessage)
        this._state.dialogsPage.newMessageText = ''
        this._subscribe()
        break
      case UPDATE_NEW_MESSAGE_TEXT:
        this._state.dialogsPage.newMessageText = action.messageText
        this._subscribe()
        break
      default:
        break;
    }
  }
}


export const addPostActionCreator = () => {
  return {
    type: ADD_POST
  }
}

export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text
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



window.store = store

export default store
