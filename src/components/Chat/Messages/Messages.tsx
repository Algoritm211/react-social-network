import {Button} from "antd";
import React, {useEffect, useState} from "react";
import {useRef} from "react";
import Message from "./Message/Message";
import classes from './Messages.module.css'
import {ArrowDownOutlined} from '@ant-design/icons'
import classNames from "classnames";

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
  const [isScrollDownMessageButton, setIsScrollDownMessageButton] = useState<boolean>(false)


  const messagesBlockRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    if (messagesBlockRef.current !== null) {
      const numberOfPixelsWasScrolled = (messagesBlockRef.current.scrollHeight - messagesBlockRef.current.scrollTop) - messagesBlockRef.current.offsetHeight
      if (numberOfPixelsWasScrolled > 100) {
        setIsScrollDownMessageButton(true)
      } else {
        setIsScrollDownMessageButton(false)
      }
    }
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }

  useEffect(() => {
    //debugger
    wsChannel.addEventListener('message', (event) => {
      setMessages((prevMessages) => {
        return [...prevMessages, ...JSON.parse(event.data)]
      })
      scrollToBottom()
    })
  }, [])


  const messageElement = messages.map((message, index) => {
    return <Message messageInfo={message} key={index}/>
  })

  return (
    <div className={classes.messagesWindow + ' ' + 'msgs'} ref={messagesBlockRef} onScroll={onScroll}>
      {messageElement}
      <div ref={messagesEndRef} className={'messagesEnd'}/>
      <ScrollMessagesDownButton
        isScrollDownMessageButton={isScrollDownMessageButton}
        scrollToBottom={scrollToBottom}/>
    </div>
  )
}

export default Messages

type ScrollMessagesDownButtonProps = {
  isScrollDownMessageButton: boolean,
  scrollToBottom: () => void
}

const ScrollMessagesDownButton: React.FC<ScrollMessagesDownButtonProps> = (props) => {

  return (
    <div
      className={classNames(classes.scrollMessagesDown,
        {[classes.scrollMessagesDownActive]: props.isScrollDownMessageButton})}>
      <Button
        type="primary"
        shape="circle"
        icon={<ArrowDownOutlined/>}
        onClick={() => props.scrollToBottom()}>
      </Button>
    </div>
  )
}