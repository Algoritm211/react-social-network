const { addPostActionCreator, default: profileReducer, deletePostAC } = require("./profile-reducer")


const initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you", likesCount: 12 },
    { id: 2, message: "it`s my first post", likesCount: 15 },
  ],
  profile: null,
  status: ''
}

it('3 posts should be returned', () => {
  const action = addPostActionCreator('New post 3')
  const newState = profileReducer(initialState, action)
  expect(newState.postsData.length).toBe(3)
})


it('Deleting posts in profile-reducer.js, 1 post should be returned', () => {
  const action = deletePostAC(1)
  const newState = profileReducer(initialState, action)
  expect(newState.postsData.length).toBe(1) 
}) 

//TODO протестировать какой-либо другой reducer