import React, {useEffect, useState} from 'react'
import {Field, FieldProps, Form, Formik, FormikProps} from "formik";
import classes from './SendMessageForm.module.css'
import {Button, Col, Row} from 'antd';
import {SendOutlined} from '@ant-design/icons'
import {Input} from 'antd'
import {useDispatch} from "react-redux";
import { sendMessage } from '../../../redux/chat-reducer';

type ChatMessageType = {
  message: string
}

type Props = {

}

const SendMessageForm: React.FC<Props> = () => {

  const dispatch = useDispatch()

  const onSubmit = (values: ChatMessageType, {setSubmitting, resetForm}: any) => {
    if (values.message === '') {
      return
    }
    dispatch(sendMessage(values.message))
    setSubmitting(false)
    resetForm()
  }

  return (
    <div className={classes.sendChatMessageForm}>
      <Formik
        initialValues={{message: ''}}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <Row>
              <Col span={14}>
                <Field type={'text'} name="message" component={AntTextArea} />
              </Col>
              <Col span={10}>
                <Button htmlType={'submit'} type={"primary"} icon={<SendOutlined/>}>Send message</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

const AntTextArea:React.FC<FieldProps> = ({ field, form, ...props }) => {
  const {TextArea} = Input;
  return (
    <TextArea showCount={true} autoSize={true} className={classes.messageArea} maxLength={300} {...field} {...props}/>
  )
}

export default SendMessageForm
