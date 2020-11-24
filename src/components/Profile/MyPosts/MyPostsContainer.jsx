import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import StoreContext from "../../../StoreContext";
import Dialogs from "../../Dialogs/Dialogs";
import MyPosts from "./MyPosts";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {connect} from 'react-redux'

// const MyPostsContainer = (props) => {

//   return (

//     <StoreContext.Consumer>
//       {
//         (store) => {
//           let state = store.getState().profilePage

//           const onAddPost = () => {
//             store.dispatch(addPostActionCreator())
//           }
        
//           let onPostChange = (text) => {
//             store.dispatch(updateNewPostTextActionCreator(text))
//           }
        
//           return (
//             <MyPosts 
//               onAddPost={onAddPost} 
//               onPostChange={(text) => onPostChange(text)}
//               posts={state.postsData}
//               newPostText={state.newPostText}
//             />
//           )
//         }
//       }
//     </StoreContext.Consumer>
//   );
// };

function mapStateToProps(state) {
  return {
    posts: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddPost: () => {
      dispatch(addPostActionCreator())
    },
    onPostChange: (text) => {
      dispatch(updateNewPostTextActionCreator(text))
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
