import React from "react";
import Loader from "../common/Loader/Loader";
// import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from './MyPosts/MyPostsContainer'
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType, StatusType} from "../../types/types";

type PropsType = {
  profile: ProfileType | null
  status: StatusType['status'],
  isPageOwner: boolean,
  statusUpdateError: StatusType['errorMessage'],
  updateProfile: (userData: any) => Promise<any>,
  setUserPhoto: (photoFile: File) => void,
  updateStatus: (status: string) => void,
}

const Profile: React.FC<PropsType> = (props) => {

  if (!props.profile) {
    return <Loader />
  }
  return (
    <div className={classes.profileBlock}>
      <ProfileInfo
        isPageOwner={props.isPageOwner}
        profile={props.profile}
        updateStatus={props.updateStatus}
        statusUpdateError={props.statusUpdateError}
        status={props.status}
        updateProfile={props.updateProfile}
        setPhoto={props.setUserPhoto}/>
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
