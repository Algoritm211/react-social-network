import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {

  let myContacts = props.profile.contacts

  const myContactsElement = Object.entries(myContacts).map((contact, index) => {
    let fieldInfo = contact[1] ? contact[1] : 'No information'
    return (
      <div key={index} className={classes.contactsItem}>
          <strong> {contact[0]}:  </strong> <a href={contact[1]}>{fieldInfo}</a>
      </div>
    )
  })

  return (
    <React.Fragment>
      <div>
        <img
          src="https://d3g7htsbjjywiv.cloudfront.net/assets/graphicstock/images/media-type/vector/Hero.jpg"
          alt=""
        />
      </div>
      <div className={classes.descriptionBlock}>
        <div className={classes.profilePhoto}>
          <img src={props.profile.photos.large} alt={props.profile.fullname}/>
        </div>
        <div className={classes.nameAndStatus}>
          <div className={classes.name}>
            Имя: {props.profile.fullName}
          </div>
          <div className={classes.descriptionItem}>
            Описание: {props.profile.lookingForAJobDescription}
          </div>
          <div className={classes.descriptionItem}>
            Рабочий статус: {props.profile.lookingForAJob ? 'Ищу работу' : 'Уже работаю'}
          </div>
          <div className={classes.descriptionItem}>
            Проф. описание: {props.profile.lookingForAJobDescription}
          </div>
        </div>
      </div>
      {/* block */}
      <div className={classes.myContacts}>
        <span>
          Мои контакты:
        </span>
        {myContactsElement}
      </div>
    </React.Fragment>
  );
};

export default ProfileInfo;
