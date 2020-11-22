import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import StoreContext from "../../../StoreContext";
import MyPosts from "./MyPosts";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPostsContainer = (props) => {

  return (

    <StoreContext.Consumer>
      {
        (store) => {
          let state = store.getState().profilePage

          const onAddPost = () => {
            store.dispatch(addPostActionCreator())
          }
        
          let onPostChange = (text) => {
            store.dispatch(updateNewPostTextActionCreator(text))
          }
        
          return (
            <MyPosts 
              onAddPost={onAddPost} 
              onPostChange={(text) => onPostChange(text)}
              posts={state.postsData}
              newPostText={state.newPostText}
            />
          )
        }
      }
    </StoreContext.Consumer>
  );
};

export default MyPostsContainer;
