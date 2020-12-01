import React from "react";
import { Field, reduxForm } from "redux-form";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const postForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* <textarea 
          ref={newPostElement} 
          value={props.newPostText} 
          onChange={onPostChange}
          /> */}
        <Field component='textarea' type='text' name='newPost' placeholder='Add new post'/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const PostReduxForm = reduxForm({
  form: 'post'
})(postForm)

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
      <PostReduxForm onSubmit={(formData) => onAddPost(formData)}/>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  );
};

export default MyPosts;
