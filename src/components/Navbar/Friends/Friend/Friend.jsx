import React from "react";
import classes from "./Friend.module.css";

const Friend = (props) => {
  return (
    <div className={classes.friend}>
      <div>
        <img
          src={props.img}
          alt="friendImage"
        />
      </div>
      <div>{props.name}</div>
    </div>
  );
};

export default Friend;
