import React, {useEffect, useState} from 'react'
import Messages from './Messages/Messages';
import SendMessageForm from "./SendMessageForm/SendMessageForm";
import {useDispatch} from "react-redux";
import {startMessageListening, stopMessageListening} from "../../redux/chat-reducer";


const ChatPage: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessageListening())

    return () => {
      dispatch(stopMessageListening())
    }

  }, [])

  return (
    <React.Fragment>
      <Messages/>
      <SendMessageForm/>
    </React.Fragment>
  )
}

export default ChatPage