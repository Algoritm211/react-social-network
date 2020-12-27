import React from 'react'
import {Formik} from 'formik'
import {Field} from "formik";
import { Form } from 'formik'
import {FilterType} from "../../../redux/users-reducer";


const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

type FormType = {
  term: string,
  friend: string
}

type FormProps = {
  onChangeFilter: (filter: FilterType) => void
}

const SearchUserForm:React.FC<FormProps> = (props) => {

  const onSubmit = (values: FormType, { setSubmitting }: any) => {

    const preparedValues: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true'
    }
    // setTimeout(() => {
    //   alert(JSON.stringify(preparedValues, null, 2));
    //   setSubmitting(false);
    // }, 400);
    props.onChangeFilter(preparedValues)
    setSubmitting(false)
  }

  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: 'null' }}
        validate={usersSearchFormValidate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field as="select" name="friend">
              <option value="null">All</option>
              <option value="true">Only Followed</option>
              <option value="false">Only Unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SearchUserForm