import React from 'react'
import classes from './ValidatedFields.module.css'


const ValidatedFieldsCreator = ({input, type, ...props}) => {
  const {touched, error} = props.meta
  const errorClass = error && touched ? classes.error : '' //Not empty string if error and field war touched
  return (
    <div className={classes.formField + ' ' + errorClass}>
      <div>
        {React.cloneElement(props.children, {
            ...input, 
            type: type,
            placeholder: props.placeholder 
          })
        }
      </div>
        {touched && 
            (error && 
            <span>
              <i className="fa fa-exclamation-circle"></i> 
              {error}
            </span>)
            }
    </div>
  )
}

export const Textarea = (props) => {
  return (
    <ValidatedFieldsCreator {...props}>
      <textarea />
    </ValidatedFieldsCreator>
  )
}

export const Input = (props) => {
  return (
  <ValidatedFieldsCreator {...props}>
    <input />
  </ValidatedFieldsCreator>
  )
}