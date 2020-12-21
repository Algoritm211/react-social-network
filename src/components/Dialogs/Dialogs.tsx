import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'
import {DialogsDataType, MessagesDataType} from "../../redux/dialogs-reducer";

type DialogsProps = {
  dialogsData: Array<DialogsDataType>,
  messagesData: Array<MessagesDataType>,
  onSendMessage: (message: string) => void
}

const Dialogs: React.FC<DialogsProps> = ({dialogsData, messagesData, onSendMessage}) => {

  const dialogsElements = dialogsData.map((dialog, index) => {
    return (
      <DialogItem name={dialog.name} id={dialog.id} key={index}/>
    )
  })

  const messagesElements = messagesData.map((msg, index) => {
    return(
      <Message message={msg.message} key={index}/>
    )
  })

  const onSendMessageText = (formData: any) => {
    onSendMessage(formData.messageText)
  }

  return (
    <div className={classes.dialogBlock}>
      <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>
          { dialogsElements }
        </div>
        <div className={classes.messageItems}>
          { messagesElements }
        </div>
        <MessageForm onSubmit={(formData) => onSendMessageText(formData)} />
      </div>
    </div>
  )
}


export default Dialogs