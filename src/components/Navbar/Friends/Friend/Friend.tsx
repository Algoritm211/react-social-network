import React from "react";
import classes from "./Friend.module.css";
import {FriendsType} from "../../../../types/types";

type PropsType = {
  img: FriendsType['img']
  name: FriendsType['name']
}

const Friend: React.FC<PropsType> = (props) => {
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
