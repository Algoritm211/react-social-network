import React from 'react'
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/state'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'



const Dialogs = (props) => {
  const dialogsElements = props.state.dialogsData.map((dialog, index) => {
    return (
      <DialogItem name={dialog.name} id={dialog.id} key={index}/>
    )
  })

  const messagesElements = props.state.messagesData.map((msg, index) => {
    return(
      <Message message={msg.message} key={index}/>
    )
  })

  const newMessageElement = React.createRef()

  const onSendMessage = () => {
    props.dispatch(sendMessageActionCreator())
  }

  const onMessageChange = () => {
    let text = newMessageElement.current.value
    props.dispatch(updateNewMessageTextActionCreator(text))
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
              value={props.state.newMessageText} 
              onChange={onMessageChange}
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