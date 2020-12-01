import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { loginUser } from '../../redux/auth-reducer'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field type='text' component='input' name='email' placeholder='Login'/>
      </div>
      <div>
        <Field type='text' component='input' name='password' placeholder='Password'/>
      </div>
      <div>
        <Field type='checkbox' component='input' name='rememberMe'/> Remember me
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)


const Login = (props) => {
  const onSubmit = (formData) =>{
    props.loginUser(formData);
  }
  return (
    <div>
      <h2>LoginPage</h2>
      <LoginReduxForm onSubmit={(formData) => onSubmit(formData)}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (formData) => {
      dispatch(loginUser(formData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)