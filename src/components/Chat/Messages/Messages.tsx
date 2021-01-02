import React, {useEffect, useState} from "react";
import Message from "./Message/Message";
import classes from './Messages.module.css'


export type MessageType = {
  message: string,
  photo: string | null,
  userId: number,
  userName: string

}

//Work with websocket

export const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Messages: React.FC = () => {

  const [messages, setMessages] = useState<Array<MessageType>>([])

  useEffect(() => {
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
    <div className={classes.messagesWindow}>
      {messageElement}
    </div>
  )
}
export default Messages