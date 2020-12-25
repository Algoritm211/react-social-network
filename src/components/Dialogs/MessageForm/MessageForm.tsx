import React from 'react'
import {Field, FormProps, InjectedFormProps, reduxForm} from 'redux-form'
import { MessagesDataType } from '../../../redux/dialogs-reducer'
import { Textarea } from '../../common/ValidatedFields/validatedFields'
import { createMaxLengthValivator, required } from '../../utils/validators'
import classes from './MessageForm.module.css'


type Props = InjectedFormProps<MessagesDataType, {}>

const maxLength70 = createMaxLengthValivator(70)
const MessageForm: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.sendMessages}>
      <div>
        <Field 
        type='text' 
        component={Textarea} 
        name='messageText'
        validate={[required, maxLength70]} 
        placeholder='Enter your message'/>
      </div>
      <div>
        <button>Send message</button>
      </div>
    </form>
  )
}

export default reduxForm<MessagesDataType, {}>({
  form: 'message'
})(MessageForm)