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
        <Avatar size={40} src={messageInfo.photo} alt={messageInfo.userName}/>
        {messageInfo.userName}
      </div>
      <div>
        {messageInfo.message}
      </div>
    </div>
  )
}
export default Message