import React from 'react'
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer'
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
    newMessageText: state.dialogsPage.newMessageText,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSendMessage: () => {
      dispatch(sendMessageActionCreator())
    },
    onMessageChange: (text) => {
      dispatch(updateNewMessageTextActionCreator(text))
    }
  }
}



export default compose(
                connect(mapStateToProps, mapDispatchToProps),
                withAuthRedirect
              )(Dialogs)