import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import MessageForm, { DialogMessageType } from './MessageForm/MessageForm'
import {actions, DialogsDataType, MessagesDataType} from "../../redux/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import { getDialogsData, getMessagesData } from '../../redux/dialogs-selector'
import withAuthRedirect from "../hoc/withAuthRedirect";

type DialogsProps = {}


const Dialogs: React.FC<DialogsProps> = () => {

  const dispatch = useDispatch()

  const dialogsData = useSelector(getDialogsData)
  const messagesData = useSelector(getMessagesData)

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

  const onSendMessageText = (formData: DialogMessageType) => {
    dispatch(actions.sendMessage(formData.messageText))
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


export default withAuthRedirect(Dialogs)