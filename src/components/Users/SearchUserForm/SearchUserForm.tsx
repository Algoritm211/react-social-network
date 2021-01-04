import React from 'react'
import {Field, Form, Formik} from 'formik'
import {FilterType} from "../../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../../redux/users-selector";


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

  const filter = useSelector(getFilter)

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
        enableReinitialize={true}
        initialValues={{ term: filter.term, friend: String(filter.friend)}}
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