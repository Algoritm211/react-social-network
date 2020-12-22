import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/ValidatedFields/validatedFields";
import {required} from "../../../utils/validators";
import classes from './ProfileUpdateForm.module.css'
import {ProfileType} from "../../../../types/types";

type OwnProps = {
  profile: ProfileType
}

type Props = OwnProps & InjectedFormProps<ProfileType, OwnProps>

const ProfileUpdateForm: React.FC<Props> = ({profile, handleSubmit, error}) => {

  const contactsFields = Object.entries(profile.contacts).map((contact, index) => {
    return (
      <div key={ index }>
        <Field
          type='text'
          component={ Input }
          name={ 'contacts.' + contact[0] }
          placeholder={ contact[0] }
        />
      </div>
    )
  })

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <button>Save</button>
      </div>
      <div>
        <Field
          type='text'
          component={ Input }
          name='fullName'
          placeholder='Введите свое имя'
        />
      </div>
      <div>
        <Field
          type='checkbox'
          name='lookingForAJob'
          component='input'
        /> Ищите ли вы работу?
      </div>
      <div>
        <Field
          type='text'
          component={ Textarea }
          name='lookingForAJobDescription'
          placeholder='Введите свои навыки'
        />
      </div>
      <div>
        <Field
          type='text'
          component={ Textarea }
          name='aboutMe'
          placeholder='Введите информацию о себе'
        />
      </div>
      <div>
        Contacts:
        { contactsFields }
      </div>
      { error &&
      <div className={ classes.formSubmitError }>
        { error }
      </div>
      }
    </form>
  )
}

export default reduxForm<ProfileType, OwnProps>({
  form: 'editProfileForm'
})(ProfileUpdateForm)