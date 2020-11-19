import React from 'react'
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

  return (
    <div>
      <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>
          { dialogsElements }
        </div>
        <div className={classes.messages}> 
          { messagesElements }
        </div>
      </div>
    </div>
  )
}

export default Dialogs