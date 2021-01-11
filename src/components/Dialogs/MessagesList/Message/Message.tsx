import React from 'react'
import classes from './Message.module.css'


type PropsType = {
  message: string
}

const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.message}>
      <div>
        <img src="https://i.imgur.com/sFRuG9D.jpg" alt="messageImage"/>
      </div>
      <div className={classes.messageText}>
        {props.message}
      </div>
    </div>
  )
}

export default Message