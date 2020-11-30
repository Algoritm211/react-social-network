import React from "react";
import { Redirect } from "react-router-dom";
import Loader from "../Loader/Loader";
// import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from './MyPosts/MyPostsContainer'
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  if (!props.profile) {
    return <Loader />
  }
  return (
    <div className={classes.profileBlock}>
      <ProfileInfo profile={props.profile} updateStatus={props.updateStatus} status={props.status}/>
      <MyPostsContainer />

      {/* <MyPosts 
        posts={props.state.postsData} 
        newPostText={props.state.newPostText}
        dispatch={props.dispatch}
        /> */}
    </div>
  );
};

export default Profile;
