import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'



const Dialogs = (props) => {

  let dialogsData = [
    {id: 1, name: 'Alexey'},
    {id: 2, name: 'Alex'},
    {id: 3, name: 'Sabr'},
    {id: 4, name: 'Edward'},
  ]

  let messagesData = [
    {id: 1, message: 'Hi, how are you'},
    {id: 2, message: 'Hello, do you want to drink coffee with me?'},
  ]

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