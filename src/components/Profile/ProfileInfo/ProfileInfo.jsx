import React from "react";
import classes from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import noProfilePhoto from '../../../assets/images/user_no_photo.png'
import {NavLink} from "react-router-dom";

const ProfileInfo = (props) => {

  const onChangePhoto = (event) => {
    if (event.target.files !== 0) {
      props.setPhoto(event.target.files[0])
    }
  }

  let myContacts = props.profile.contacts

  const myContactsElement = Object.entries(myContacts).map((contact, index) => {
    let fieldInfo = contact[1] ? contact[1] : 'No information'
    return (
      <div key={ index } className={ classes.contactsItem }>
        <strong> { contact[0] }: </strong> <a href={ contact[1] }>{ fieldInfo }</a>
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
      <div className={ classes.descriptionBlock }>

        <div className={ classes.profilePhoto }>
          <img src={ props.profile.photos.large || noProfilePhoto } alt={ props.profile.fullname }/>
        </div>
        <div className={ classes.nameAndStatus }>
          <div className={ classes.name }>
            Имя: { props.profile.fullName }
          </div>
          <div className={ classes.descriptionItem }>
            <ProfileStatus status={ props.status } updateStatus={ props.updateStatus }/>
          </div>
          <div className={ classes.descriptionItem }>
            Рабочий статус: { props.profile.lookingForAJob ? 'Ищу работу' : 'Уже работаю' }
          </div>
          <div className={ classes.descriptionItem }>
            Проф. описание: { props.profile.lookingForAJobDescription }
          </div>
          {
            props.isPageOwnwer &&
            <React.Fragment>
              <div className={ classes.choosePhoto }>
                <label htmlFor="uploadAvatar" id="label">Выберите файл для смены аватара: &nbsp;</label>
                <input
                  id={ 'uploadAvatar' }
                  type={ 'file' }
                  onChange={ onChangePhoto }
                />
              </div>
              <div>
                  <NavLink to={'/changeprofile'}>
                    <button>
                      Изменить информацию о профиле
                    </button>
                  </NavLink>
              </div>
            </React.Fragment>
          }

        </div>
      </div>
      {/* block */ }
      <div className={ classes.myContacts }>
        <span>
          Мои контакты:
        </span>
        { myContactsElement }
      </div>
    </React.Fragment>
  );
};

export default ProfileInfo;
