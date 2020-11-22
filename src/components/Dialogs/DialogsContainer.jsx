import React from 'react'
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer'
import StoreContext from '../../StoreContext'
import DialogItem from './DialogItem/DialogItem'
import Dialogs from './Dialogs'
import classes from './Dialogs.module.css'
import Message from './Message/Message'



const DialogsContainer = (props) => {

  return (
    <StoreContext.Consumer>
      {
        (store) => {
          let state = store.getState().dialogsPage

          const onSendMessage = () => {
            store.dispatch(sendMessageActionCreator())
          }
        
          const onMessageChange = (text) => {
            store.dispatch(updateNewMessageTextActionCreator(text))
          }

          return (
            <Dialogs 
              onSendMessage={onSendMessage}
              onMessageChange={(text) => onMessageChange(text)} 
              state={state}
            />
          )
        }
      }
      
    </StoreContext.Consumer>
  )
}


export default DialogsContainer