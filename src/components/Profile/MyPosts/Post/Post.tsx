import React from "react";
import classes from './Post.module.css'

type Props = {
  message: string,
  likesCount: number
}


export const Post: React.FC<Props> = (props) => {
  return (
    <div className={classes.item}>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToVm-BfiWN-1qbMxJSI3ydyyHFa7_N7vBPDw&usqp=CAU" alt=""/>
      </div>
      <div className={classes.message}>
        {props.message} <br/>
        <span>{props.likesCount} likes</span>
      </div>
    </div>
  );
};
