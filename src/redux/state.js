// let dialogsData = [
//   {id: 1, name: 'Alexey'},
//   {id: 2, name: 'Alex'},
//   {id: 3, name: 'Sabr'},
//   {id: 4, name: 'Edward'},
// ]

// let messagesData = [
//   {id: 1, message: 'Hi, how are you'},
//   {id: 2, message: 'Hello, do you want to drink coffee with me?'},
// ]

// let postsData = [
//   {id: 1, message: 'Hi, how are you', likesCount: 12},
//   {id: 2, message: 'it`s my first post', likesCount: 15},
// ]

let state = {
  profilePage: {
    postsData: [
      { id: 1, message: "Hi, how are you", likesCount: 12 },
      { id: 2, message: "it`s my first post", likesCount: 15 },
    ],
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
  },
  sidebar: {
    friends: [
      {id: 1, name: 'Alex', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
      {id: 2, name: 'Edward', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
    ]
  }
};


export default state