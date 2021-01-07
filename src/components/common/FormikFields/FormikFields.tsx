import React from "react"
import {Input} from "antd";
import {FieldProps} from "formik";


export const FormikInput: React.FC<FieldProps> = ({ field, form, ...props }) => {
  return (
    <Input {...field} {...props} />
  )
}