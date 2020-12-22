import React, {useState} from "react";
import classes from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import noProfilePhoto from '../../../assets/images/user_no_photo.png'
//import {NavLink} from "react-router-dom";
import ProfileUpdateForm from "./ProfileUpdateForm/ProfileUpdateForm";
import {ProfileType, StatusType} from "../../../types/types";
import {FileHandle} from "fs/promises";

type ProfileInfoPropsType = {
  profile: ProfileType,
  status: StatusType['status'],
  isPageOwner: boolean,
  statusUpdateError: StatusType['errorMessage'] | null,
  updateProfile: (userData: any) => Promise<any>,
  setPhoto: (photoFile: File) => void,
  updateStatus: (status: string) => void,
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

  const [editMode, setEditMode] = useState<boolean>(false)

  const onToggleEditMode = () => {
    setEditMode(true)
  }

  const updateUserInfo = (formData: any) => {
    let promise = props.updateProfile(formData)
    promise.then(() => {
      setEditMode(false)
    })
      .catch((error: Error) => {
      })
  }
  return (
    <React.Fragment>
      <div>
        <img
          src="https://d3g7htsbjjywiv.cloudfront.net/assets/graphicstock/images/media-type/vector/Hero.jpg"
          alt=""
        />
      </div>

      { !editMode
        ? <ProfileBlock
          profile={ props.profile }
          statusUpdateError={ props.statusUpdateError }
          onToggleEditMode={ onToggleEditMode }
          setPhoto={ props.setPhoto }
          updateStatus={ props.updateStatus }
          status={ props.status }
          isPageOwner={ props.isPageOwner }
        />
        : <ProfileUpdateForm
          initialValues={ props.profile }
          onSubmit={ (formData) => updateUserInfo(formData) }
          profile={ props.profile }
        />
      }
    </React.Fragment>
  );
};

type ProfileBlockPropsType = {
  profile: ProfileType,
  onToggleEditMode: () => void,
  setPhoto: (photoFile: File) => void,
  updateStatus: (status: string) => void,
  status: StatusType['status'],
  isPageOwner: boolean,
  statusUpdateError: string | null
}

const ProfileBlock: React.FC<ProfileBlockPropsType> = ({profile,
                        onToggleEditMode,
                        setPhoto,
                        updateStatus,
                        status,
                        isPageOwner,
                        statusUpdateError}) => {

  const onChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files!== null && event.target.files.length !== 0) {
      setPhoto(event.target.files[0])
    }
  }

  let myContacts = profile.contacts

  const myContactsElement = Object.entries(myContacts).map((contact, index) => {
    let fieldInfo = contact[1] ? contact[1] : 'No information'
    return (
      <div key={ index } className={ classes.contactsItem }>
        <strong> { contact[0] }: </strong> <a href={ contact[1] || '#' } target={ '_blank' } rel="noreferrer">{ fieldInfo }</a>
      </div>
    )
  })
  return (
    <React.Fragment>
      <div className={ classes.descriptionBlock }>

        <div className={ classes.profilePhoto }>
          <img src={ profile.photos.large || noProfilePhoto } alt={ profile.fullName }/>
        </div>
        <div className={ classes.nameAndStatus }>
          <div className={ classes.name }>
            Имя: { profile.fullName }
          </div>
          <div className={ classes.descriptionItem }>
            Немного обо мне: { profile.aboutMe }
          </div>
          <div className={ classes.descriptionItem }>
            <ProfileStatus
              status={ status }
              updateStatus={ updateStatus }
              statusUpdateError={statusUpdateError}/>
          </div>
          <div className={ classes.descriptionItem }>
            Рабочий статус: { profile.lookingForAJob ? 'Ищу работу' : 'Уже работаю' }
          </div>
          <div className={ classes.descriptionItem }>
            Проф. описание: { profile.lookingForAJobDescription }
          </div>
          {
            isPageOwner &&
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
                <button onClick={ onToggleEditMode }>
                  Изменить информацию о профиле
                </button>
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
  )
}

export default ProfileInfo;
