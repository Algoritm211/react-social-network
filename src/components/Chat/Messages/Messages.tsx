import React, {useEffect, useState} from "react";
import Message from "../../common/ChatCommonComponents/Message/Message";
import { MessageType } from "../../../types/types";
import MessageWindow from "../../common/ChatCommonComponents/MessageWindow/MessageWindow";

//Work with websocket

export const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Messages: React.FC = () => {

  const [messages, setMessages] = useState<Array<MessageType>>([])

  useEffect(() => {
    //debugger
    wsChannel.addEventListener('message', (event) => {
      setMessages((prevMessages) => {
        return [...prevMessages, ...JSON.parse(event.data)]
      })
    })
  }, [])


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
