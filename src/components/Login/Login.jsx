import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../redux/auth-reducer'
import LoginForm from './LoginForm/LoginForm'


const Login = (props) => {
  const onSubmit = (formData) =>{
    const {email, password, rememberMe = false, captcha} = formData
    props.loginUser(email, password, rememberMe, captcha);
  }

  if (props.isAuth) {
    return <Redirect to='/profile'/>
  }
  return (
    <div>
      <h2>LoginPage</h2>
      <LoginForm onSubmit={(formData) => onSubmit(formData)} captchaURL={props.captchaURL}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captcha
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     loginUser: (email, password, rememberMe, captcha = null) => {
//       dispatch(loginUser(email, password, rememberMe, captcha))
//     }
//   }
// }

export default connect(mapStateToProps, {loginUser})(Login)