import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPostsContainer = (props) => {

  let state = props.store.getState().profilePage

  const onAddPost = () => {
    props.store.dispatch(addPostActionCreator())
  }

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostTextActionCreator(text))
  }

  return (
    <MyPosts 
      onAddPost={onAddPost} 
      onPostChange={(text) => onPostChange(text)}
      posts={state.postsData}
      newPostText={state.newPostText}
    />
  );
};

export default MyPostsContainer;
