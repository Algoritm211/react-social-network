import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import PostForm from "./PostForm/PostForm";

const MyPosts = (props) => {

  const postsElements = props.posts.map((post, index) => {
    return (
      <Post message={post.message} likeCounts={post.likesCount} key={index}/> 
    )
  })

  const onAddPost = (formData) => {
    props.onAddPost(formData.newPost)
  }

  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3> 
      <PostForm onSubmit={(formData) => onAddPost(formData)}/>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  );
};

export default React.memo(MyPosts);
