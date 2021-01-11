import React from 'react'
import classes from './Dialogs.module.css'
import Message from './MessagesList/Message/Message'
import MessageForm, { DialogMessageType } from './MessagesList/MessageForm/MessageForm'
import {actions, DialogsDataType, MessagesDataType} from "../../redux/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import { getDialogsData, getMessagesData } from '../../redux/dialogs-selector'
import withAuthRedirect from "../hoc/withAuthRedirect";
import DialogsList from './DialogsList/DialogsList'
import MessagesList from "./MessagesList/MessagesList";

type DialogsProps = {}


const Dialogs: React.FC<DialogsProps> = () => {

  const dispatch = useDispatch()

  const dialogsData = useSelector(getDialogsData)
  const messagesData = useSelector(getMessagesData)


  const onSendMessageText = (formData: DialogMessageType) => {
    dispatch(actions.sendMessage(formData.messageText))
  }

  return (
    <div className={classes.dialogBlock}>
      <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>
          <DialogsList dialogsData={dialogsData} />
        </div>
        <div className={classes.messageItems}>
          <MessagesList messagesData={messagesData} />
        </div>
        <MessageForm onSubmit={(formData) => onSendMessageText(formData)} />
      </div>
    </div>
  )
}


export default withAuthRedirect(Dialogs)