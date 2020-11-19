import React from "react";
import Friend from "./Friend/Friend";
import classes from "./Friends.module.css";

const Friends = (props) => {

  let friendsBlock = props.friends.map((friend, index) => {
    return (
      <Friend name={friend.name} img={friend.img} key={index}/>
    )
  })

  return (
    <div className={classes.friendsBlock}>
      <div>Friends</div>
      <div className={classes.friends}>
        { friendsBlock }
      </div>
    </div>
  );
};

export default Friends;
