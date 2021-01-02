import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Textarea} from '../../../common/ValidatedFields/validatedFields'
import {createMaxLengthValivator, required} from '../../../utils/validators'
import classes from './PostForm.module.css'
import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Col, Row} from "antd";

const maxLength100 = createMaxLengthValivator(100)

export type NewPostType = {
  newPost: string

}

type Props = InjectedFormProps<NewPostType, {}>

const PostForm: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          type='text'
          name='newPost'
          validate={[required, maxLength100]}
          placeholder='Add new post'/>
      </div>
      <div>
        <Button
          htmlType={'submit'}
          type={'primary'}
          icon={<PlusCircleOutlined/>}
          className={classes.addPostButton}
        >
          Add post
        </Button>
      </div>
    </form>
  )
}

export default reduxForm<NewPostType, {}>({
  form: 'post'
})(PostForm)
