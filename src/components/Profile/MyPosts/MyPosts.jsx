import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {

  let postsData = [
    {id: 1, message: 'Hi, how are you', likesCount: 12},
    {id: 2, message: 'it`s my first post', likesCount: 15},
  ]

  const postsElements = postsData.map(post => {
    return (
      <Post message={post.message} likeCounts={post.likesCount}/> 
    )
  })
  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3> 
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  );
};

export default MyPosts;
