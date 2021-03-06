import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {loginUser} from '../../redux/auth-reducer'
import {MainLoginFormType} from '../../types/types'
import LoginForm from './LoginForm/LoginForm'
import {getCaptchaURL, getIsAuth} from "../../redux/auth-selector";
import classes from './Login.module.css'

type PropsType = {}

const Login: React.FC<PropsType> = (props) => {


  const isAuth = useSelector(getIsAuth)
  const captchaURL = useSelector(getCaptchaURL)

  const dispatch = useDispatch()

  const onSubmit = (formData: MainLoginFormType) =>{
    const {email = '', password = '', rememberMe = false, captcha = null} = formData
    dispatch(loginUser(email, password, rememberMe, captcha));
  }

  if (isAuth) {
    return <Redirect to='/profile'/>
  }

  return (
    <div className={classes.loginPage}>
      <h2>Login Page</h2>
      <LoginForm onSubmit={(formData) => onSubmit(formData)} captchaURL={captchaURL}/>
    </div>
  )
}
export default Login
