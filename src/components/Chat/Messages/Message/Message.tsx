import React from 'react'
import {MessageType} from "../Messages";
import {Avatar} from "antd";
import classes from './Message.module.css'

type Props = {
  messageInfo: MessageType
}

const Message: React.FC<Props> = ({messageInfo}) => {
  return (
    <div className={classes.message}>
      <div className={classes.messagesAvatar}>
        <div>
          <Avatar size={40} src={messageInfo.photo} alt={messageInfo.userName}/>
        </div>
      </div>
      <div className={classes.messageBody}>
        <div className={classes.messageUserName}>
          {messageInfo.userName}
        </div>
        <div className={classes.messageText}>
          {messageInfo.message}
        </div>
      </div>
    </div>
  )
}
export default Message