import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

  return (
    <div>
      <ProfileInfo />
      <MyPosts 
        posts={props.state.postsData} 
        newPostText={props.state.newPostText}
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
        />
    </div>
  );
};

export default Profile;
