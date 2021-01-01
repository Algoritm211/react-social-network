import React from 'react'
import {Field, Form, Formik, FormikProps} from "formik";
import classes from './SendMessageForm.module.css'
import {wsChannel} from "../Messages/Messages";
import { Button } from 'antd';


type ChatMessageType = {
  message: string
}

const SendMessageForm: React.FC = (props) => {

  const onSubmit = (values: ChatMessageType, { setSubmitting }: any) => {
    wsChannel.send(values.message)
    setSubmitting(false)
  }

  return (
    <div className={classes.sendChatMessageForm}>
      <Formik
        initialValues={{message: ''}}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field type={'text'} name="message" placeholder="Enter your message"/>
            <Button htmlType={'submit'}>Send message</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}


export default SendMessageForm
