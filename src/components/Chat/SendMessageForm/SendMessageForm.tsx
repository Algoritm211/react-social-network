import React from 'react'
import {Field, FieldProps, Form, Formik, FormikProps} from "formik";
import classes from './SendMessageForm.module.css'
import {wsChannel} from "../Messages/Messages";
import {Button, Col, Row} from 'antd';
import {SendOutlined} from '@ant-design/icons'
import {Input} from 'antd'

type ChatMessageType = {
  message: string
}

const SendMessageForm: React.FC = (props) => {

  const onSubmit = (values: ChatMessageType, {setSubmitting, resetForm}: any) => {
    if (values.message === '') {
      return
    }
    wsChannel.send(values.message)
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
