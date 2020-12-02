import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../../common/ValidatedFields/validatedFields'
import {createMaxLengthValivator, required } from '../../../utils/validators'

const maxLenght100 = createMaxLengthValivator(100)

const PostForm = (props) => {
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

export default reduxForm({
  form: 'post'
})(PostForm)
