import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../../common/ValidatedFields/validatedFields'
import { createMaxLengthValivator, isEmail, required } from '../../utils/validators'

const maxLength50 = createMaxLengthValivator(50)

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field 
          type='text' 
          component={Input}
          name='email'
          validate={[required, isEmail]}
          placeholder='Login'/>
      </div>
      <div>
        <Field 
          type='text' 
          component={Input} 
          name='password' 
          validate={[required, maxLength50]}
          placeholder='Password'/>
      </div>
      <div>
        <Field 
          type='checkbox' 
          component='input' 
          name='rememberMe'/> Remember me
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'login'
})(LoginForm)
