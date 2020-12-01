import React from 'react'
import { sendMessage, sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer'
import StoreContext from '../../StoreContext'
import DialogItem from './DialogItem/DialogItem'
import Dialogs from './Dialogs'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import {connect} from 'react-redux'
import withAuthRedirect from '../hoc/withAuthRedirect'
import { compose } from 'redux'



// const DialogsContainer = (props) => {

//   return (
//     <StoreContext.Consumer>
//       {
//         (store) => {
//           let state = store.getState().dialogsPage

//           const onSendMessage = () => {
//             store.dispatch(sendMessageActionCreator())
//           }
        
//           const onMessageChange = (text) => {
//             store.dispatch(updateNewMessageTextActionCreator(text))
//           }

//           return (
//             <Dialogs 
//               onSendMessage={onSendMessage}
//               onMessageChange={(text) => onMessageChange(text)} 
//               state={state}
//             />
//           )
//         }
//       }
      
//     </StoreContext.Consumer>
//   )
// }

function mapStateToProps(state) {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    // newMessageText: state.message.messageText
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSendMessage: (message) => {
      dispatch(sendMessage(message))
    },
  }
}



export default compose(
                connect(mapStateToProps, mapDispatchToProps),
                withAuthRedirect
              )(Dialogs)