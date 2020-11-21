import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

  const postsElements = props.posts.map((post, index) => {
    return (
      <Post message={post.message} likeCounts={post.likesCount} key={index}/> 
    )
  })

  let newPostElement = React.createRef()

  const onAddPost = () => {
    props.dispatch({
      type: 'ADD-POST'
    })
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    let action = {
      type: 'UPDATE-NEW-POST-TEXT',
      newText: text
    }
    props.dispatch(action)
  }

  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3> 
      <div>
        <div>
          <textarea 
            ref={newPostElement} 
            value={props.newPostText} 
            onChange={onPostChange}
            />
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  );
};

export default MyPosts;
