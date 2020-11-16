import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import classes from './Profile.module.css'


const Profile = () => {
  return (
    <div className={classes.content}>
      <div>
        <img
          src="https://d3g7htsbjjywiv.cloudfront.net/assets/graphicstock/images/media-type/vector/Hero.jpg"
          alt=""
        />
      </div>
      <div>avatar + description</div>
      <MyPosts />
    </div>
  );
};

export default Profile;
