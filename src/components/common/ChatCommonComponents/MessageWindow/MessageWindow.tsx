import React, {useEffect, useRef, useState} from 'react'
import classes from "./MessageWindow.module.css";
import classNames from "classnames";
import {Button} from "antd";
import {ArrowDownOutlined} from "@ant-design/icons";

type Props = {
  dependency: any
}

const MessageWindow: React.FC<Props> = (props) => {
  const [isScrollDownMessageButton, setIsScrollDownMessageButton] = useState<boolean>(false)

  const messagesBlockRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [props.dependency])

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

  return (
    <div className={classes.messagesWindow + ' ' + 'msgs'} ref={messagesBlockRef} onScroll={onScroll}>
      {props.children}
      <div ref={messagesEndRef} className={'messagesEnd'}/>
      <ScrollMessagesDownButton
        isScrollDownMessageButton={isScrollDownMessageButton}
        scrollToBottom={scrollToBottom}/>
    </div>
  )
}


export default MessageWindow


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