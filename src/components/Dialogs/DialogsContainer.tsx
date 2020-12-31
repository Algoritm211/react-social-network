import React from 'react'
import {actions, DialogsDataType, MessagesDataType} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import withAuthRedirect from '../hoc/withAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from "../../redux/redux-store";



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

type DialogsContainerStateType = {
  dialogsData: Array<DialogsDataType>
  messagesData: Array<MessagesDataType>
}

type DialogsContainerDispatchType = {
  onSendMessage: (message: string) => void
}


function mapStateToProps(state: AppStateType): DialogsContainerStateType {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    // newMessageText: state.message.messageText
  }
}

const mapDispatchToProps = {
  onSendMessage: actions.sendMessage
}

const DialogsContainer = compose(
    connect<DialogsContainerStateType, DialogsContainerDispatchType, never, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

export default DialogsContainer as React.FC