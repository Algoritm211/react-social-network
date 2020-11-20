import React from 'react'
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
    let text = newMessageElement.current.value
    alert(text)
  }

  return (
    <div className={classes.dialogBlock}>
      <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>
          { dialogsElements }
        </div>
        <div className={classes.messages}> 
          { messagesElements }
          <div className={classes.sendMessages}>
            <div>
              <textarea ref={newMessageElement}></textarea>
            </div>
            <div>
              <button onClick={onSendMessage}>Send message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Dialogs