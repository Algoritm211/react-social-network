import React from "react";
import Loader from "../common/Loader/Loader";
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
      <ProfileInfo
        isPageOwnwer={props.isPageOwnwer}
        profile={props.profile}
        updateStatus={props.updateStatus}
        status={props.status}
        setPhoto={props.setPhoto}/>
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
