import React from 'react'
import { Redirect } from 'react-router-dom'
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'



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

  const newMessageElement = React.createRef()
  let messageBody = props.newMessageText

  const onSendMessage = () => {
    props.onSendMessage()
  }

  const onMessageChange = () => {
    let text = newMessageElement.current.value
    props.onMessageChange(text)
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
        <div className={classes.sendMessages}>
          <div>
            <textarea 
              ref={newMessageElement} 
              value={messageBody}
              onChange={onMessageChange}
              placeholder='Enter your message'
            />
          </div>
          <div>
            <button onClick={onSendMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Dialogs