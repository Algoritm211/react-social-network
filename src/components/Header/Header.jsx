import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css'

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src="https://i.pinimg.com/originals/4e/40/dd/4e40ddd11beb9ba671a0b59948861afb.png"></img>

      <div className={classes.loginBlock}>
        {props.isAuth
          ? props.login
          : <NavLink to='/login/'>Login</NavLink>
          }
        
      </div>
    </header>
  )
}

export default Header 