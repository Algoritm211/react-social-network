import React from "react";
import classes from './Post.module.css'

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToVm-BfiWN-1qbMxJSI3ydyyHFa7_N7vBPDw&usqp=CAU" alt=""/>
      {props.message}
      <div>
        <span>{props.likeCounts} likes</span>
      </div>
    </div>
  );
};

export default Post;
