import React from 'react'
import MessageWindow from "../../common/ChatCommonComponents/MessageWindow/MessageWindow";
import Message from "../../common/ChatCommonComponents/Message/Message";
import { MessageType } from '../../../api/chat-api';

type Props = {
  messagesData: Array<MessageType>
}

const MessagesList:React.FC<Props> = (props) => {

  const messagesElement = props.messagesData.map((message, index) => {
    return (
      <Message messageInfo={message} key={index} />
    )
  })


  return (
    <MessageWindow dependency={'s'}>
      {messagesElement}
    </MessageWindow>
  )
}
export default MessagesList