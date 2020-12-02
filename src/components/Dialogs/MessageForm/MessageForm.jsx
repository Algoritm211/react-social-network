import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../common/ValidatedFields/validatedFields'
import { createMaxLengthValivator, required } from '../../utils/validators'
import classes from './MessageForm.module.css'

const maxLength70 = createMaxLengthValivator(70)

const MessageForm = (props) => {
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

export default reduxForm({
  form: 'message'
})(MessageForm)