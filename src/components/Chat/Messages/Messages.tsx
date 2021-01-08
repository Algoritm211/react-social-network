import React, {useEffect, useState} from "react";
import { useRef } from "react";
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

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    wsChannel.addEventListener('message', (event) => {
      setMessages((prevMessages) => {
        return [...prevMessages, ...JSON.parse(event.data)]
      })
    })
  }, [])

  useEffect(scrollToBottom, [messages]);

  const messageElement = messages.map((message, index) => {
    return <Message messageInfo={message} key={index}/>
  })

  return (
    <div className={classes.messagesWindow}>
      {messageElement}
      <div ref={messagesEndRef} />
    </div>
  )
}
export default Messages