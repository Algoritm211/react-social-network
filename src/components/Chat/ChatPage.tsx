import React, {useEffect} from 'react'
import Messages from './Messages/Messages';
import SendMessageForm from "./SendMessageForm/SendMessageForm";



const ChatPage: React.FC = () => {

  return (
    <React.Fragment>
      <Messages/>
      <SendMessageForm/>
    </React.Fragment>
  )
}

export default ChatPage