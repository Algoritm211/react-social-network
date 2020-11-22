import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from './MyPosts/MyPostsContainer'
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

  return (
    <div className={classes.profileBlock}>
      <ProfileInfo />
      <MyPostsContainer store={props.store}/>

      {/* <MyPosts 
        posts={props.state.postsData} 
        newPostText={props.state.newPostText}
        dispatch={props.dispatch}
        /> */}
    </div>
  );
};

export default Profile;
