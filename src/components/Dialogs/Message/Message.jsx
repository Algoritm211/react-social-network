import React from 'react'
import classes from './Message.module.css'


const Message = (props) => { 
  return (
    <div className={classes.message}>
      <div>
        <img src="https://i.imgur.com/sFRuG9D.jpg" alt="messageImage"/>
      </div>
      <div>
        {props.message}
      </div>
    </div>
  )
}

export default Message