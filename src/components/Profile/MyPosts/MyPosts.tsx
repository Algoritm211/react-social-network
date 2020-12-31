import React from "react";
import classes from './MyPosts.module.css'
import {Post} from "./Post/Post";
import PostForm, {NewPostType} from "./PostForm/PostForm";
import {PostType} from "../../../types/types";


type Props = {
  posts: Array<PostType>,
  onAddPost: (post: string) => void
}
const MyPosts: React.FC<Props> = (props) => {

  const postsElements = props.posts.map((post, index) => {
    return (
      <Post message={post.message} likesCount={post.likesCount} key={index}/>
    )
  })

  const onAddPost = (formData: NewPostType) => {
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
