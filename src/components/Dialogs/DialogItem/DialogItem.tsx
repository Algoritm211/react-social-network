import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './DialogItem.module.css'

type PropsType = {
  id: number
  name: string
}

const DialogItem:React.FC<PropsType> = (props) => {
  let pathToDialog = `/dialogs/${props.id}`
  return (
    <div className={classes.dialog}>
      <div>
        <img src="https://i.imgur.com/Ss75Vfa.jpg" alt="dialogItem"/>
      </div>
      <div>
        <NavLink to={pathToDialog} activeClassName={classes.active}>{props.name}</NavLink>
      </div>
    </div>
  )
}

export default DialogItem