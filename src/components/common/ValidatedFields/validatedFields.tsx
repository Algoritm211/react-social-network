import React from 'react'
import classes from './ValidatedFields.module.css'
import classNames from 'classnames'
import {CommonFieldInputProps, FormContext, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import { Input as AntInput } from 'antd';

const { TextArea } = AntInput;



type ValidatedFieldsCreatorPropsType = {
  meta: WrappedFieldMetaProps,
  input: CommonFieldInputProps
  placeholder: string | undefined,
  children: React.ReactElement
}

const ValidatedFieldsCreator: React.FC<ValidatedFieldsCreatorPropsType> = ({input, meta, ...props}) => {
  const {touched, error} = meta
  // const errorClass = error && touched ? classes.error : '' //Not empty string if error and field war touched
  return (
    <div className={classNames(classes.formField, {
      [classes.error]: error && touched
    })}>
      <div>
        {React.cloneElement(props.children, {
            ...input,
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


type TextAreaProps = {
  onSubmit: () => void
  placeholder: string
}

export const Textarea: React.FC<WrappedFieldProps & TextAreaProps> = (props) => {
  const onPressCtrlEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
   if (event.ctrlKey && event.key === 'Enter') {
     props.onSubmit()
   }
  }
  return (
    <ValidatedFieldsCreator {...props}>
      <TextArea maxLength={300} showCount={true} onKeyPress={onPressCtrlEnter}/>
    </ValidatedFieldsCreator>
  )
}

type InputProps = {
  placeholder: string
}

export const Input: React.FC<WrappedFieldProps & InputProps> = (props) => {
  return (
  <ValidatedFieldsCreator {...props}>
    <AntInput />
  </ValidatedFieldsCreator>
  )
}