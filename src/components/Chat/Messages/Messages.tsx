import React, {useEffect, useState} from "react";
import { MessageType } from "../../../api/chat-api";
import Message from "../../common/ChatCommonComponents/Message/Message";
import MessageWindow from "../../common/ChatCommonComponents/MessageWindow/MessageWindow";
import {useSelector} from "react-redux";
import {getChatMessages} from "../../../redux/chat-selector";

//Work with websocket


type Props = {

}

const Messages: React.FC<Props> = () => {

  const messages = useSelector(getChatMessages)

  const messageElement = messages.map((message, index) => {
    return <Message messageInfo={message} key={index}/>
  })

  return (
    <MessageWindow dependency={messages}>
      {messageElement}
    </MessageWindow>
  )
}

export default Messages
