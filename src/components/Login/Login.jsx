import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/auth-reducer'
import LoginForm from './LoginForm/LoginForm'


const Login = (props) => {
  const onSubmit = (formData) =>{
    props.loginUser(formData);
  }
  return (
    <div>
      <h2>LoginPage</h2>
      <LoginForm onSubmit={(formData) => onSubmit(formData)}/>
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