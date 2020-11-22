import React from 'react'
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer'
import DialogItem from './DialogItem/DialogItem'
import Dialogs from './Dialogs'
import classes from './Dialogs.module.css'
import Message from './Message/Message'



const DialogsContainer = (props) => {

  let state = props.store.getState().dialogsPage

  const onSendMessage = () => {
    props.store.dispatch(sendMessageActionCreator())
  }

  const onMessageChange = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text))
  }

  return (
    <Dialogs 
      onSendMessage={onSendMessage}
      onMessageChange={(text) => onMessageChange(text)} 
      state={state}
    />
  )
}


export default DialogsContainer