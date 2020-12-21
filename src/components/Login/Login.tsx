import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../redux/auth-reducer'
import { MainLoginFormType } from '../../types/types'
import LoginForm from './LoginForm/LoginForm'
import {AppStateType} from "../../redux/redux-store";


type LoginStateType = {
  isAuth: boolean,
  captchaURL: string | null
}


type LoginDispatchType = {
  loginUser: (email: string,
              password: string,
              rememberMe: boolean,
              captcha: string | null) => void
}

type PropsType = LoginStateType & LoginDispatchType

const Login: React.FC<PropsType> = (props) => {

  const onSubmit = (formData: MainLoginFormType) =>{
    const {email = '', password = '', rememberMe = false, captcha = null} = formData
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

function mapStateToProps(state: AppStateType) {
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

export default connect<LoginStateType, LoginDispatchType, {}, AppStateType>
          (mapStateToProps, {loginUser})
          (Login)