import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'



const Dialogs = (props) => {

  const dialogsElements = props.dialogsData.map((dialog, index) => {
    return (
      <DialogItem name={dialog.name} id={dialog.id} key={index}/>
    )
  })

  const messagesElements = props.messagesData.map((msg, index) => {
    return(
      <Message message={msg.message} key={index}/>
    )
  })

  const onSendMessage = (formData) => {
    props.onSendMessage(formData.messageText)
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
        <MessageForm onSubmit={(formData) => onSendMessage(formData)}/>
      </div>
    </div>
  )
}


export default Dialogs