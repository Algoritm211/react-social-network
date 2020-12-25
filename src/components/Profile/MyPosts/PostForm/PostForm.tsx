import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import { PostType } from '../../../../types/types'
import { Textarea } from '../../../common/ValidatedFields/validatedFields'
import {createMaxLengthValivator, required } from '../../../utils/validators'

const maxLenght100 = createMaxLengthValivator(100)

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
          validate={[required, maxLenght100]}
          placeholder='Add new post'/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

export default reduxForm<NewPostType, {}>({
  form: 'post'
})(PostForm)
