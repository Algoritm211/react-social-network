import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../redux/auth-reducer'
import LoginForm from './LoginForm/LoginForm'


const Login = (props) => {
  const onSubmit = (formData) =>{
    const {email, password, rememberMe} = formData
    props.loginUser(email, password, rememberMe);
  }

  if (props.isAuth) {
    return <Redirect to='/profile'/>
  }

  return (
    <div>
      <h2>LoginPage</h2>
      <LoginForm onSubmit={(formData) => onSubmit(formData)}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (email, password, rememberMe) => {
      dispatch(loginUser(email, password, rememberMe))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)