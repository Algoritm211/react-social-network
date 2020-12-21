import {FriendsType} from "../types/types";


const initialState = {
  friends: [
    {id: 1, name: 'Alex', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
    {id: 2, name: 'Edward', img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-snowshoe-cat-square-elisabeth-lucas.jpg'},
  ] as Array<FriendsType>
}

type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, actions: any): InitialStateType  => {
  return state
}

export default sidebarReducer