import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <React.Fragment>
      <div>
        <img
          src="https://d3g7htsbjjywiv.cloudfront.net/assets/graphicstock/images/media-type/vector/Hero.jpg"
          alt=""
        />
      </div>
      <div className={classes.descriptionBlock}>
        avatar + description
      </div>
    </React.Fragment>
  );
};

export default ProfileInfo;
