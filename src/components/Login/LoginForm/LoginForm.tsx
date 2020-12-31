import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {MainLoginFormType} from '../../../types/types'
import {Input} from '../../common/ValidatedFields/validatedFields'
import {createMaxLengthValivator, isEmail, required} from '../../utils/validators'
import classes from './LoginForm.module.css'


type OwnProps = {
  captchaURL: string | null
}

type Props = OwnProps & InjectedFormProps<MainLoginFormType, OwnProps>

const maxLength50 = createMaxLengthValivator(50)
const LoginForm: React.FC<Props> = (props) => {
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
      {
        props.captchaURL &&
          <div>
            <img src={props.captchaURL} className={classes.captchaImg} alt={'captchaIMG'}/>
            <div>
              <Field
                type='text'
                component={Input}
                name='captcha'
                placeholder='Enter symbols in captcha'
                />
            </div>
          </div>
      }
      { props.error &&
        <div className={classes.formSubmitError}>
          {props.error}
        </div>
      }
      <div>
        <button>Submit</button>
      </div>
    </form>
  )
}

export default reduxForm<MainLoginFormType, OwnProps>({
  form: 'login'
})(LoginForm)
