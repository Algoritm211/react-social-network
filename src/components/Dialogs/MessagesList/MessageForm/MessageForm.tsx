import { Button } from 'antd'
import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Textarea} from '../../../common/ValidatedFields/validatedFields'
import {createMaxLengthValivator, required} from '../../../utils/validators'
import classes from './MessageForm.module.css'
import {SendOutlined} from "@ant-design/icons";

export type DialogMessageType = {
  messageText: string
}
type Props = InjectedFormProps<DialogMessageType, {}>

const maxLength70 = createMaxLengthValivator(70)
const MessageForm: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.sendMessages}>
      <div>
        <Field 
        type='text' 
        component={Textarea} 
        name='messageText'
        validate={[required, maxLength70]} 
        placeholder='Enter your message'/>
      </div>
      <div className={classes.sendMessageButton}>
        <Button htmlType={'submit'} type={'primary'} icon={<SendOutlined/>}>Send message</Button>
      </div>
    </form>
  )
}

export default reduxForm<DialogMessageType, {}>({
  form: 'message'
})(MessageForm)