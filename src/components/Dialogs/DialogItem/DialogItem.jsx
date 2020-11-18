import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './DialogItem.module.css'

const DialogItem = (props) => {
  let pathToDialog = `/dialogs/${props.id}`
  return (
    <div className={classes.dialog}>
      <NavLink to={pathToDialog} activeClassName={classes.active}>{props.name}</NavLink>
    </div>
  )
}

export default DialogItem